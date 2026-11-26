import { useState } from 'react'
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import '../../css/pages/admin.css'
import { useAuth } from '../../contexto/useAuth'

// Menú según el diagrama de navegación del administrador.
// "sub" son las opciones que cuelgan de Producto (se muestran con sangría).
// "vendedor": también la ve el rol VENDEDOR (solo productos y órdenes, sin modificar).
const MENU = [
  { ruta: '/admin', texto: 'Dashboard', icono: 'bi-speedometer2', exacta: true },
  { ruta: '/admin/ordenes', texto: 'Órdenes / Boletas', icono: 'bi-receipt', vendedor: true },
  { ruta: '/admin/productos', texto: 'Productos', icono: 'bi-basket', exacta: true, vendedor: true },
  { ruta: '/admin/productos/criticos', texto: 'Productos críticos', icono: 'bi-exclamation-triangle', sub: true, vendedor: true },
  { ruta: '/admin/categorias', texto: 'Categorías', icono: 'bi-tags' },
  { ruta: '/admin/usuarios', texto: 'Usuarios', icono: 'bi-people' },
  { ruta: '/admin/mensajes', texto: 'Mensajes', icono: 'bi-envelope' },
  { ruta: '/admin/reportes', texto: 'Reportes', icono: 'bi-bar-chart' },
  { ruta: '/admin/perfil', texto: 'Perfil', icono: 'bi-person-gear' },
]

/**
 * Estructura del panel admin (Bootstrap, responsive):
 *  - Escritorio (>= lg): menú lateral fijo a la izquierda.
 *  - Celular/tablet: el menú se esconde y se abre con el botón ☰ (Offcanvas).
 * Las páginas del admin se dibujan en <Outlet />.
 */
function AdminLayout() {
  const { usuario, esAdmin, cerrarSesion } = useAuth()
  const menu = esAdmin ? MENU : MENU.filter((item) => item.vendedor)
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const salir = () => {
    cerrarSesion()
    navigate('/Login')
  }

  return (
    <div className="admin-shell">
      <Navbar variant="dark" className="admin-navbar shadow-sm" sticky="top">
        <Container fluid>
          <Button variant="outline-light" size="sm" className="d-lg-none me-2"
            onClick={() => setMenuAbierto(true)} aria-label="Abrir menú">
            <i className="bi bi-list" />
          </Button>

          <Navbar.Brand as={Link} to={esAdmin ? '/admin' : '/admin/productos'} className="d-flex align-items-center gap-2">
            <img src="/img/logo.png" alt="" />
            <span className="d-none d-sm-inline">HuertoHogar · {esAdmin ? 'Admin' : 'Vendedor'}</span>
          </Navbar.Brand>

          <div className="ms-auto d-flex align-items-center gap-2">
            <span className="text-white small d-none d-md-inline">
              <i className="bi bi-person-circle me-1" />
              {usuario?.nombre}
            </span>
            <Button as={Link} to="/" variant="outline-light" size="sm" title="Ver tienda">
              <i className="bi bi-shop" /> <span className="d-none d-sm-inline">Ver tienda</span>
            </Button>
            <Button variant="light" size="sm" onClick={salir} title="Cerrar sesión">
              <i className="bi bi-box-arrow-right" /> <span className="d-none d-sm-inline">Salir</span>
            </Button>
          </div>
        </Container>
      </Navbar>

      <div className="d-lg-flex">
        {/* responsive="lg": Offcanvas en pantallas chicas, barra lateral normal en grandes */}
        <Offcanvas show={menuAbierto} onHide={() => setMenuAbierto(false)} responsive="lg"
          className="admin-sidebar" aria-label="Menú de administración">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="flex-column p-3 w-100">
            <Nav className="flex-column gap-1 w-100">
              {menu.map((item) => (
                <Nav.Link key={item.ruta} as={NavLink} to={item.ruta} end={item.exacta}
                  className={item.sub ? 'sub' : undefined}
                  onClick={() => setMenuAbierto(false)}>
                  <i className={`bi ${item.icono}`} aria-hidden="true" />
                  {item.texto}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        <main className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
