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
- Proceso de checkout y confirmación de compra.
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

```bash
# Terminal 1: backend
cd backEnd
mvnw.cmd spring-boot:run      # Windows   (./mvnw spring-boot:run en macOS / Linux)

# Terminal 2: frontend
npm install
npm run dev
```

Si el backend no está corriendo, la tienda muestra *"No se pudo conectar con el servidor"*.

## Panel de administración

| Correo                 | Contraseña | Rol     | Entra a      |
|------------------------|------------|---------|--------------|
| admin@huertohogar.cl   | Admin123   | ADMIN   | `/admin`     |
| cliente@huertohogar.cl | Cliente123 | CLIENTE | `/Profile`   |

El backend usa **H2 en memoria**: al reiniciarlo, los datos vuelven a los iniciales que carga `DataInitializer`.

### De dónde salen los datos

| Capa | Dónde | Qué hace |
|------|-------|----------|
| Componentes | `src/pages`, `src/components` | Solo muestran datos; nunca llaman a la API directamente |
| Hooks de la tienda | `src/hooks/useCatalogo.js` | `useProductos()` y `useCategorias()` piden los datos e informan si están cargando |
| Servicios | `src/services/*Service.js` | Llamadas con axios a `/api/v1/...` |
| Cliente HTTP | `src/api.js` | axios con la URL del backend y el token JWT en cada petición (igual que el ejemplo del curso) |
| Backend | `backEnd/` | Spring Boot + JPA + H2, con los datos iniciales en `DataInitializer` |

Lo que el admin edita (precios, ofertas, stock, categorías) queda guardado en el backend y se ve en la tienda.

### Navegación del administrador (según el diagrama)

| Opción del diagrama | Ruta | Página |
|---|---|---|
| Home / Dashboard | `/admin` | `AdminDashboard` |
| Órdenes / Boletas → Mostrar boleta | `/admin/ordenes` | `OrdenesAdmin` + `BoletaModal` |
| Producto → Nuevo / Mostrar / Editar | `/admin/productos` | `ProductosAdmin` + `ProductoForm` |
| Producto → Listado productos críticos | `/admin/productos/criticos` | `ProductosAdmin` (`soloCriticos`) |
| Producto → Reportes / Reportes | `/admin/reportes` | `ReportesAdmin` |
| Categoría → Nueva / Editar | `/admin/categorias` | `CategoriasAdmin` + `CategoriaForm` |
| Usuario → Nuevo / Mostrar / Editar | `/admin/usuarios` | `UsuariosAdmin` + `UsuarioForm` |
| Usuario → Historial de compras | `/admin/usuarios` (botón Historial) | `OrdenesTabla` + `BoletaModal` |
| Perfil | `/admin/perfil` | `PerfilAdmin` + `FormularioPerfil` |

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
| `components/BoletaDetalle.jsx` / `BoletaModal.jsx` | Checkout, Órdenes, Historial de compras, Mi Cuenta |
| `components/OrdenesTabla.jsx` | Órdenes, Historial de compras, Mi Cuenta |
| `hooks/useAgregarAlCarrito.js` | Botón "Añadir al carrito" de `ProductoCatalogo` y `OfertasDestac` |
| `hooks/useListado.js` | Todas las páginas del admin y Mi Cuenta (con función de limpieza, como el `useFetch` del tutorial de hooks) |
| `utils/validation.js` | Login, registro, usuarios y perfil (formularios controlados con `useState`) |
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

- 43 pruebas en 17 archivos, incluidas las 10 solicitadas (`Prueba 1` a `Prueba 10`).
- Datos de prueba en `src/test/test-utils.jsx` y servicios simulados con `vi.mock()`.
- El informe de cobertura queda guardado en **`coverage/`**: abrir **`coverage/index.html`** en el navegador.
- Detalle y resultados: [`docs/cobertura-testing.md`](docs/cobertura-testing.md).
