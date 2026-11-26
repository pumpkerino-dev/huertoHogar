<h1> HuertoHogar <img src="docs/images/natieicon.png" alt="Logo" width="80">  </h1> 

Plataforma web de comercio electrónico enfocada en la venta de productos frescos del campo, conectando a los consumidores con productos agrícolas y alimentos de calidad.

El proyecto busca ofrecer una experiencia de compra sencilla e intuitiva, permitiendo explorar productos, consultar sus detalles y gestionar un carrito de compras.

## Tecnologías utilizadas

- **React:** desarrollo de la interfaz mediante componentes.
- **Vite:** entorno de desarrollo y herramienta de construcción.
- **JavaScript:** implementación de la lógica de la aplicación.
- **HTML5 y CSS3:** estructura y estilos.
- **React Router:** navegación entre páginas.
- **Bootstrap 5.3.8:** recursos de interfaz y estilos.

## Funcionalidades

- Página de inicio con productos destacados y ofertas.
- Catálogo de productos.
- Visualización del detalle de cada producto.
- Carrito de compras con gestión de cantidades.
- Almacenamiento del carrito mediante `localStorage`.
- Proceso de checkout con datos de envío (se autocompletan con la cuenta) y páginas de compra exitosa y con error.
- Seguimiento del pedido en Mi Cuenta (En preparación → En camino → Entregado).
- Páginas de Ofertas, Categorías y Contacto (el mensaje se guarda en el backend).
- Nosotros con video embebido y mapa de las 7 tiendas.
- Registro con RUN (módulo 11), región y comuna dependientes, y correos solo @duoc.cl, @profesor.duoc.cl o @gmail.com.
- Panel de administración para ADMIN y vista de solo lectura para VENDEDOR.
- Sección de blog y visualización de artículos.
- Easter egg.

## Requisitos

Para ejecutar el proyecto localmente necesitas:

- Node.js.
- npm.
- Git (opcional, para clonar el repositorio).

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/pumpkerino-dev/huertoHogar.git
```

Ingresa a la carpeta del proyecto:

```bash
cd huertoHogar
```

Instala las dependencias:

```bash
npm ci
```

## Ejecución en desarrollo

Inicia el servidor local:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para acceder a la aplicación desde el navegador.

## Compilación para producción

Para generar la versión de producción:

```bash
npm run build
```

Los archivos compilados se guardarán en la carpeta `dist/`.

Para visualizar localmente la compilación:

```bash
npm run preview
```

### Cómo probarlo

El frontend toma **todos los datos del backend** (igual que el ejemplo JWT + Spring Boot + React del curso),
así que primero se levanta el backend y después el frontend:

El backend está en la rama **`react-backend`** de este mismo repositorio:
<https://github.com/pumpkerino-dev/huertoHogar/tree/react-backend>

```bash
# Terminal 1: backend (rama react-backend, en otra carpeta)
git clone -b react-backend https://github.com/pumpkerino-dev/huertoHogar.git huertoHogar-backend
cd huertoHogar-backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=h2"   # sin MySQL (datos en memoria)
.\mvnw.cmd spring-boot:run                                    # con MySQL en localhost:3306

# Terminal 2: frontend
npm install
npm run dev
```

Si el backend no está corriendo, la tienda muestra *"No se pudo conectar con el servidor"*.

## Panel de administración

| Correo            | Contraseña | Rol      | Entra a           | Qué ve |
|-------------------|------------|----------|-------------------|--------|
| admin@duoc.cl     | Admin123   | ADMIN    | `/admin`          | Todo el panel |
| vendedor@duoc.cl  | Vendedor1  | VENDEDOR | `/admin/productos`| Productos y órdenes, sin modificar |
| cliente@gmail.com | Cliente123 | CLIENTE  | `/Profile`        | Tienda y Mi Cuenta |

Con el perfil `h2` los datos viven en memoria y vuelven a los iniciales al reiniciar el backend; con MySQL quedan guardados.

### Sesión con JWT y renovación del token

Al iniciar sesión el backend entrega dos tokens que se guardan en `localStorage`: el de **acceso** (15 minutos) y el de
**renovación** (7 días). `api.js` envía el de acceso en cada petición; si el backend responde 401 porque venció,
pide uno nuevo a `POST /auth/refresh` y repite la petición sin que el usuario lo note. Si la renovación también
falla, se cierra la sesión.

### De dónde salen los datos

| Capa | Dónde | Qué hace |
|------|-------|----------|
| Componentes | `src/pages`, `src/components` | Solo muestran datos; nunca llaman a la API directamente |
| Hooks de la tienda | `src/hooks/useCatalogo.js` | `useProductos()` y `useCategorias()` piden los datos e informan si están cargando |
| Servicios | `src/services/*Service.js` | Llamadas con axios a `/api/v1/...` (`/productos`, `/categorias`, `/boletas`, `/usuarios`, `/contacto`, `/auth`) |
| Cliente HTTP | `src/api.js` | axios con la URL del backend, el token JWT en cada petición y la renovación automática |
| Datos fijos | `src/data` | Regiones y comunas (de la plantilla del curso), tiendas y artículos del blog |
| Backend | rama `react-backend` | Spring Boot + JPA + MySQL (o H2), con los datos iniciales en `DataInitializer` |

Lo que el admin edita (precios, ofertas, stock, categorías) queda guardado en el backend y se ve en la tienda.

### Navegación del administrador (según el diagrama)

| Opción del diagrama | Ruta | Página | VENDEDOR |
|---|---|---|---|
| Home / Dashboard | `/admin` | `AdminDashboard` | No |
| Órdenes / Boletas → Mostrar boleta, cambiar estado | `/admin/ordenes` | `OrdenesAdmin` + `BoletaModal` | Solo ver |
| Producto → Nuevo / Mostrar / Editar / Eliminar | `/admin/productos` | `ProductosAdmin` + `ProductoForm` | Solo ver |
| Producto → Listado productos críticos | `/admin/productos/criticos` | `ProductosAdmin` (`soloCriticos`) | Solo ver |
| Producto → Reportes / Reportes | `/admin/reportes` | `ReportesAdmin` | No |
| Categoría → Nueva / Editar / Eliminar | `/admin/categorias` | `CategoriasAdmin` + `CategoriaForm` | No |
| Usuario → Nuevo / Mostrar / Editar | `/admin/usuarios` | `UsuariosAdmin` + `UsuarioForm` | No |
| Usuario → Historial de compras | `/admin/usuarios` (botón Historial) | `OrdenesTabla` + `BoletaModal` | No |
| Mensajes de contacto | `/admin/mensajes` | `MensajesAdmin` | No |
| Perfil | `/admin/perfil` | `PerfilAdmin` + `FormularioPerfil` | No |

`AdminRoute` deja entrar al panel a ADMIN y VENDEDOR; con `soloAdmin`, un VENDEDOR es enviado a productos.
El menú lateral muestra a cada rol solo sus opciones, y el backend rechaza con 403 lo que el rol no puede hacer.

> El diagrama muestra "Editar usuario" dentro de **Categoría**. Se interpretó como **Editar categoría**,
> porque la edición de usuarios ya está en la opción **Usuario**.

### Páginas adaptadas con Bootstrap

**Carrito** (`/ShoppingCart`), **Checkout** (`/Checkout`) y **Mi Cuenta** (`/Profile`): `Container`, `Row` y `Col`,
tablas `responsive`, `Alert`, `Card`, `Nav` y formularios de Bootstrap. Se ven en una columna en celular y en
dos en escritorio. Todo el panel `/admin` también usa Bootstrap (navbar, menú lateral `Offcanvas`, tablas y modales).

### Componentes y lógica reutilizable

| Pieza | Dónde se usa |
|---|---|
| `components/Campo.jsx` | Formularios de producto, usuario, categoría y perfil (sirve para formularios controlados y para React Hook Form) |
| `components/FormularioPerfil.jsx` | Perfil del cliente y perfil del admin |
| `components/CamposRegionComuna.jsx` | Región y comuna dependientes en perfil, usuarios del admin y checkout |
| `components/FormularioEnvio.jsx` | Datos de envío del checkout (con sugerencias `datalist` de indicaciones) |
| `components/MapaTiendas.jsx` | Mapa de Google Maps de las tiendas en Nosotros |
| `components/BoletaDetalle.jsx` / `BoletaModal.jsx` | Compra exitosa, Órdenes, Historial de compras, Mi Cuenta |
| `components/OrdenesTabla.jsx` | Órdenes (con cambio de estado para ADMIN), Historial de compras, Mi Cuenta |
| `hooks/useAgregarAlCarrito.js` | Botón "Añadir al carrito" de `ProductoCatalogo` y `OfertasDestac` |
| `hooks/useListado.js` | Todas las páginas del admin y Mi Cuenta (con función de limpieza, como el `useFetch` del tutorial de hooks) |
| `utils/validation.js` | Login, registro, usuarios, perfil, checkout y contacto: RUN (módulo 11), dominios de correo, contraseña y sugerencias de correo para `datalist` |
| `utils/esquemas.js` | Categorías: esquema **Yup** usado con **React Hook Form** (`useForm` + `yupResolver`) |
| `utils/busqueda.js` | Buscador del Header y Catálogo (mismos resultados con Enter o escribiendo) |
| `utils/producto.js` | Formatos de precio (`formatoCLP`, `formatoPrecio`) para toda la tienda y el admin |
| `utils/reportes.js` | Dashboard, Órdenes y Reportes |

---

## Pruebas unitarias y cobertura

Herramienta: **Vitest** + Testing Library, configurado en `vitest.config.js` (como el tutorial del curso).
Todas las pruebas están en **`src/test/`**, con la misma estructura de `src/`
(`src/pages/Checkout.jsx` → `src/test/pages/Checkout.test.jsx`).

```bash
npm test                                           # todas las pruebas (modo vigilancia)
npx vitest run                                     # todas las pruebas, una pasada
npx vitest run src/test/pages/Checkout.test.jsx    # un solo archivo
npx vitest run -t "Prueba 4"                       # una sola prueba por nombre
npm run test:coverage                              # cobertura (equivale a npx vitest run --coverage)
```

- 59 pruebas en 20 archivos, incluidas las 10 solicitadas (`Prueba 1` a `Prueba 10`).
- Datos de prueba en `src/test/test-utils.jsx` y servicios simulados con `vi.mock()`.
- El informe de cobertura queda guardado en **`coverage/`**: abrir **`coverage/index.html`** en el navegador.
- Detalle y resultados: [`docs/cobertura-testing.md`](docs/cobertura-testing.md).

```
             ___     -._
            `-. """--._ `-.
               `.      "-. `.
 _____           `.       `. \       C H I B I - G O K U
`-.   """---.._    \        `.\
   `-.         "-.  \         `\
      `.          `-.\          \_.-""""""""--._
        `.           `                          "-.
          `.                                       `.    __....-------...
--..._      \                                       `--"""""""""""---..._
__...._"_-.. \                       _,                             _..-""
`-.      """--`           /       ,-'/|     ,                   _.-"
   `-.                 , /|     ,'  / |   ,'|    ,|        _..-"
      `.              /|| |    /   / |  ,'  |  ,' /        ----"""""""""_`-
        `.            ( \  \      |  | /   | ,'  //                 _.-"
          `.        .'-\/'""\ |  '  | /  .-/'"`\' //            _.-"
    /'`.____`-.  ,'"\  ''''?-.V`.   |/ .'..-P''''  /"`.     _.-"
   '(   `.-._""  ||(?|    /'   >.\  ' /.<   `\    |P)||_..-"___.....---
     `.   `. "-._ \ ('   |     `8      8'     |   `) /"""""    _".""
       `.   `.   `.`.b|   `.__            __.'   |d.'  __...--""
         `.   `.   ".`-  .---      ,-.     ---.  -'.-""
           `.   `.   ""|      -._      _.-      |""
             `.  .-"`.  `.       `""""'       ,'
               `/     `.. ""--..__    __..--""
                `.      /7.--|    """"    |--.__
                  ..--"| (  /'            `\  ` ""--..
               .-"      \\  |""--.    .--""|          "-.
              <.         \\  `.    -.    ,'       ,'     >
             (P'`.        `%,  `.      ,'        /,' .-"'?)
             P    `. \      `%,  `.  ,'         /' .'     \
            | --"  _\||       `%,  `'          /.-'   .    )
            |       `-.""--..   `%..--"""\\"--.'       "-  |
 _Seal_     \          `.  .--"""  "\.\.\ \\.'       )     |
```
