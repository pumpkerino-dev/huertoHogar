# Backend HuertoHogar — Spring Boot + H2

Sigue el mismo esquema del ejemplo *JWT + Spring Boot + React* del curso: Spring Boot, JPA, **H2 en memoria**
y un `DataInitializer` que carga los datos iniciales al arrancar.

**Requisito:** Java 21 (JDK). No hace falta instalar una base de datos.

```bash
# desde la carpeta backEnd/
mvnw.cmd spring-boot:run      # Windows
./mvnw spring-boot:run        # macOS / Linux
```

- API en `http://localhost:8089/api/v1` · Swagger en **http://localhost:8089/swagger-ui.html**
- Consola de H2 en **http://localhost:8089/h2-console** (JDBC URL `jdbc:h2:mem:testdb`, usuario `sa`, sin contraseña)
- H2 vive en memoria: **al reiniciar el backend, los datos vuelven a los iniciales.**

Datos iniciales (`config/DataInitializer.java`): 4 categorías, 9 productos, 2 órdenes de ejemplo y estos usuarios:

| Correo                 | Contraseña | Rol     |
|------------------------|------------|---------|
| admin@huertohogar.cl   | Admin123   | ADMIN   |
| cliente@huertohogar.cl | Cliente123 | CLIENTE |

### Cambiar a MySQL (Ev3)

En `src/main/resources/application.yaml` está comentado el bloque de MySQL: reemplazar las líneas de H2 del
`datasource` por las de MySQL y usar `org.hibernate.dialect.MySQLDialect`. La dependencia `mysql-connector-j`
ya está en el `pom.xml`.

## Roles y seguridad (JWT)

| Rol       | Cómo se obtiene                          | Qué puede hacer |
|-----------|------------------------------------------|-----------------|
| `CLIENTE` | Registrándose en "Crear Cuenta"          | Comprar, ver y editar su perfil |
| `ADMIN`   | Admin inicial, o asignado por otro admin | Todo lo anterior + panel `/admin` (CRUD de productos, ofertas y usuarios) |

Implementado según la *Guía Paso a Paso: Autenticación JWT con Spring Boot y React*
(paquete `security/`: `JwtService`, `JwtFilter`, `CustomUserDetailsService`, `SecurityConfig`):

1. En el login se valida la contraseña (hash **BCrypt**) y se genera un **JWT firmado (HS256)**
   con el correo como *subject*, válido por 1 día.
2. El frontend lo envía en cada petición: `Authorization: Bearer <token>`.
3. `JwtFilter` valida firma y expiración, y carga el usuario y su **rol** desde la BD.
4. `SecurityConfig`: público = login, registro, `GET` de productos y categorías, confirmar una compra,
   Swagger y la consola de H2; con sesión = perfil y "mis órdenes";
   `ADMIN` = crear/editar/eliminar productos y categorías, todas las órdenes y todo `/api/v1/usuarios`.
   Sin token → **401**; token sin rol ADMIN → **403**.

La protección existe en los dos lados: en el frontend `AdminRoute` impide ver `/admin`, y en el
backend Spring Security rechaza la petición aunque alguien se salte el frontend (por ejemplo con Postman).

**Ajustes respecto de la guía:** rutas con `/api/v1/`;
roles ADMIN/CLIENTE; clave del JWT fija en `application.yml` (o variable `JWT_SECRET`) para que
los tokens no se invaliden al reiniciar; `JwtFilter` responde 401 en vez de 500 ante un token
expirado; un solo mensaje de error en el login para no revelar qué correos existen;
`DataInitializer` no borra los usuarios al arrancar.

## Endpoints

| Método | Ruta                                | Acceso  | Descripción |
|--------|-------------------------------------|---------|-------------|
| POST   | `/api/v1/auth/login`                | Público | Inicia sesión → `{ token, usuario }` |
| POST   | `/api/v1/auth/registro`             | Público | Crea una cuenta CLIENTE |
| GET    | `/api/v1/auth/me`                   | Sesión  | Usuario dueño del token |
| PUT    | `/api/v1/auth/me`                   | Sesión  | El usuario edita su perfil (nombre, teléfono, dirección) |
| GET    | `/api/v1/productos[?categoria=]`    | Público | Lista productos |
| GET    | `/api/v1/productos/{id}`            | Público | Producto por id |
| GET    | `/api/v1/productos/codigo/{codigo}` | Público | Producto por código (FR001…) |
| POST   | `/api/v1/productos`                 | ADMIN   | Crea un producto |
| PUT    | `/api/v1/productos/{id}`            | ADMIN   | Actualiza un producto (incluye oferta: `precioOriginal`) |
| DELETE | `/api/v1/productos/{id}`            | ADMIN   | Elimina un producto |
| GET    | `/api/v1/categorias`                | Público | Lista categorías con su cantidad de productos |
| POST   | `/api/v1/categorias`                | ADMIN   | Crea una categoría |
| PUT    | `/api/v1/categorias/{id}`           | ADMIN   | Edita una categoría (el id no cambia) |
| POST   | `/api/v1/ordenes`                   | Público | Confirma una compra: valida stock, descuenta y guarda la orden (`simularFallo` simula un pago rechazado) |
| GET    | `/api/v1/ordenes/mias`              | Sesión  | Pedidos del usuario logueado (Mi Cuenta) |
| GET    | `/api/v1/ordenes`                   | ADMIN   | Todas las órdenes / boletas |
| GET    | `/api/v1/ordenes/usuario/{email}`   | ADMIN   | Historial de compras de un usuario |
| GET    | `/api/v1/usuarios`                  | ADMIN   | Lista usuarios |
| POST   | `/api/v1/usuarios`                  | ADMIN   | Crea usuario (con rol) |
| PUT    | `/api/v1/usuarios/{id}`             | ADMIN   | Actualiza usuario / rol |
| DELETE | `/api/v1/usuarios/{id}`             | ADMIN   | Elimina usuario |
