# Backend HuertoHogar — Spring Boot + JPA + MySQL

API REST de la tienda HuertoHogar (DSY1104 Desarrollo Fullstack II). El frontend React vive en la rama `react`.

**Stack:** Java 21 · Spring Boot 4 · Spring Security + JWT · Spring Data JPA · MySQL (H2 opcional) · Swagger (springdoc).

## Cómo levantarlo

### Opción A — MySQL (por defecto)

1. Tener MySQL corriendo en `localhost:3306` (XAMPP, Laragon o MySQL Server).
2. La base `huertohogar` se crea sola (`createDatabaseIfNotExist=true`) y las tablas también (`ddl-auto: update`).
3. Si tu usuario no es `root` sin contraseña, define las variables antes de arrancar:

```powershell
$env:DB_USER="root"; $env:DB_PASSWORD="tu_clave"
.\mvnw.cmd spring-boot:run
```

### Opción B — H2 en memoria (sin instalar nada)

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=h2"
```

Consola H2 en http://localhost:8089/h2-console (JDBC URL `jdbc:h2:mem:huertohogar`, usuario `sa`, sin contraseña).
Con H2 los datos vuelven a los iniciales cada vez que se reinicia.

### Direcciones

- API: `http://localhost:8089/api/v1`
- Swagger: **http://localhost:8089/swagger-ui.html** (botón *Authorize* → pegar el `token` del login)
- Colección Postman: `postman/HuertoHogar.postman_collection.json`

## Datos iniciales

`config/DataInitializer.java` carga, solo si la base está vacía: 4 categorías, 9 productos con su stock crítico,
2 boletas de ejemplo y estas cuentas:

| Correo            | Contraseña | Rol      |
|-------------------|------------|----------|
| admin@duoc.cl     | Admin123   | ADMIN    |
| vendedor@duoc.cl  | Vendedor1  | VENDEDOR |
| cliente@gmail.com | Cliente123 | CLIENTE  |

## Estructura

```
src/main/java/com/huertohogar/backend
├── config/       DataInitializer, GlobalExceptionHandler, OpenApiConfig
├── controller/   Auth, Producto, Categoria, Boleta, Usuario, Contacto
├── dto/          Request / Response de cada recurso (las entidades nunca salen al cliente)
├── model/        Categoria, Producto, Usuario, Boleta, DetalleBoleta, MensajeContacto, Rol, EstadoBoleta
├── repository/   Interfaces JpaRepository
├── security/     JwtService, JwtFilter, CustomUserDetailsService, SecurityConfig
├── service/      Lógica de negocio (validaciones, stock, permisos por dueño)
└── validacion/   @Run (módulo 11), @CorreoPermitido, reglas de contraseña
```

Flujo: `Controller` → `Service` → `Repository` → BD. Los controladores solo reciben y responden; las reglas están en los servicios.

## Modelo de datos

| Tabla            | Relación                                                  |
|------------------|-----------------------------------------------------------|
| `categoria`      | 1 categoría → N productos                                 |
| `producto`       | N → 1 `categoria` (`categoria_id`), con `stock` y `stock_critico` |
| `usuario`        | 1 usuario → N boletas                                     |
| `boleta`         | N → 1 `usuario` (`usuario_id`, nulo si compró sin cuenta) · datos de envío · estado |
| `detalle_boleta` | N → 1 `boleta` y N → 1 `producto` · cantidad y precio unitario |
| `mensaje_contacto` | Mensajes del formulario de contacto                     |

## Reglas de validación

- **Correo:** solo `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`, máximo 100 caracteres.
- **Contraseña:** al iniciar sesión entre 4 y 10 caracteres; al crear una cuenta, entre 8 y 10 con mayúscula, minúscula y número.
- **RUN:** sin puntos ni guion (ej. `123456785`), entre 7 y 9 caracteres, dígito verificador por módulo 11.
- **Producto:** código mínimo 3 caracteres y único; precio y stock ≥ 0; el precio original de una oferta debe ser mayor que el precio.
- **Categoría:** nombre único de 3 a 40 caracteres; no se elimina si tiene productos.
- **Compra:** se valida el stock de todo el carrito, el total se calcula con los precios de la BD y el stock se descuenta en la misma transacción.

Errores: `400` con `{ mensaje, errores }` para validaciones, `401` sin sesión, `403` sin permiso, `404` no encontrado, `409` conflicto, `402` pago rechazado.

## Seguridad (JWT con renovación)

1. `POST /auth/login` valida la contraseña (BCrypt) y entrega dos tokens firmados HS256:
   - `token` de **acceso**, dura 15 minutos y lleva el rol.
   - `refreshToken` de **renovación**, dura 7 días.
2. El frontend envía el de acceso en cada petición: `Authorization: Bearer <token>`.
3. Cuando el de acceso vence (401), el frontend llama a `POST /auth/refresh` con el `refreshToken` y recibe un par nuevo.
4. `JwtFilter` solo acepta tokens de acceso: un `refreshToken` no sirve para llamar a la API.

| Rol        | Puede |
|------------|-------|
| `CLIENTE`  | Comprar, ver y editar su perfil, ver sus boletas y el estado de sus pedidos |
| `VENDEDOR` | Ver productos (y los de stock crítico) y ver todas las boletas con su detalle. No modifica nada |
| `ADMIN`    | Todo: CRUD de productos, categorías y usuarios, cambiar el estado de los pedidos, ver mensajes de contacto |

## Endpoints

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| POST   | `/api/v1/auth/login`              | Público  | Inicia sesión → `{ token, refreshToken, usuario }` |
| POST   | `/api/v1/auth/registro`           | Público  | Crea una cuenta CLIENTE y devuelve sus tokens |
| POST   | `/api/v1/auth/refresh`            | Público  | Renueva los tokens con `{ refreshToken }` |
| POST   | `/api/v1/auth/recuperar`          | Público  | Genera un código de 6 dígitos (10 min) para recuperar la contraseña; como no hay servidor de correo, se devuelve en `codigoDemo` |
| POST   | `/api/v1/auth/recuperar/verificar` | Público | Verifica el código `{ email, codigo }` (204) |
| POST   | `/api/v1/auth/restablecer`        | Público  | Guarda la nueva contraseña `{ email, codigo, password }` (204) |
| GET    | `/api/v1/auth/me`                 | Sesión   | Usuario dueño del token |
| PUT    | `/api/v1/auth/me`                 | Sesión   | Edita su perfil (no cambia correo ni rol) |
| GET    | `/api/v1/productos[?categoria=]`  | Público  | Lista productos |
| GET    | `/api/v1/productos/criticos`      | Público  | Productos con stock ≤ stock crítico |
| GET    | `/api/v1/productos/{id}`          | Público  | Producto por id |
| GET    | `/api/v1/productos/codigo/{codigo}` | Público | Producto por código (FR001…) |
| POST   | `/api/v1/productos`               | ADMIN    | Crea un producto |
| PUT    | `/api/v1/productos/{id}`          | ADMIN    | Actualiza un producto (oferta = `precioOriginal`) |
| DELETE | `/api/v1/productos/{id}`          | ADMIN    | Elimina (no si tiene ventas) |
| GET    | `/api/v1/categorias`              | Público  | Lista categorías con su cantidad de productos |
| GET    | `/api/v1/categorias/{id}`         | Público  | Categoría por id |
| POST   | `/api/v1/categorias`              | ADMIN    | Crea una categoría |
| PUT    | `/api/v1/categorias/{id}`         | ADMIN    | Edita una categoría |
| DELETE | `/api/v1/categorias/{id}`         | ADMIN    | Elimina (no si tiene productos) |
| POST   | `/api/v1/boletas`                 | Público  | Confirma una compra (`simularFallo: true` simula pago rechazado) |
| GET    | `/api/v1/boletas`                 | ADMIN, VENDEDOR | Todas las boletas |
| GET    | `/api/v1/boletas/mias`            | Sesión   | Boletas del usuario logueado |
| GET    | `/api/v1/boletas/{id}`            | Sesión   | Detalle (un CLIENTE solo ve las suyas) |
| GET    | `/api/v1/boletas/usuario/{usuarioId}` | ADMIN | Historial de compras de un usuario |
| PATCH  | `/api/v1/boletas/{id}/estado`     | ADMIN    | `EN_PREPARACION` → `EN_CAMINO` → `ENTREGADO`, o `CANCELADA` (devuelve stock) |
| GET    | `/api/v1/usuarios`                | ADMIN    | Lista usuarios |
| GET    | `/api/v1/usuarios/{id}`           | ADMIN    | Usuario por id |
| POST   | `/api/v1/usuarios`                | ADMIN    | Crea usuario con rol |
| PUT    | `/api/v1/usuarios/{id}`           | ADMIN    | Actualiza (password vacío = se mantiene) |
| DELETE | `/api/v1/usuarios/{id}`           | ADMIN    | Elimina (sus boletas quedan sin usuario) |
| POST   | `/api/v1/contacto`                | Público  | Envía un mensaje de contacto |
| GET    | `/api/v1/contacto`                | ADMIN    | Lista los mensajes |

### Ejemplo: confirmar una compra

```json
POST /api/v1/boletas
{
  "items": [ { "codigo": "FR001", "cantidad": 2 } ],
  "envio": {
    "nombre": "María", "apellidos": "González Silva", "correo": "cliente@gmail.com",
    "calle": "Av. Providencia 1245", "departamento": "Depto 302",
    "region": "Región Metropolitana de Santiago", "comuna": "Providencia",
    "indicaciones": "Dejar en conserjería"
  },
  "fechaEntrega": "2026-12-01",
  "simularFallo": false
}
```
