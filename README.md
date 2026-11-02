<img src="docs/images/natieicon.png" alt="Logo" width="50" align="center"> HuertoHogar

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

## Estructura principal del proyecto

```text
huertoHogar/
├── public/
│   └── img/
├── src/
│   ├── components/
│   ├── contexto/
│   ├── css/
│   ├── js/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Repositorio

[HuertoHogar - GitHub](https://github.com/pumpkerino-dev/huertoHogar)
