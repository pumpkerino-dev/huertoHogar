import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/** Estructura de las páginas de la tienda: Header arriba, la página en medio, Footer abajo. */
function StoreLayout({ onToggleFilters }) {
  return (
    <>
      <Header onToggleFilters={onToggleFilters} />
      <Outlet />
      <Footer />
    </>
  )
}

export default StoreLayout
