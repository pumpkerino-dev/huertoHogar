import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import StoreLayout from './components/StoreLayout'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import BlogDetalle from './components/BlogDetalle'
import ProductoDetalle from './components/ProductoDetalle'

import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Nosotros from './pages/Nosotros'
import Login from './pages/Login'
import RecuperarContrasena from './pages/RecuperarContrasena'
import ShoppingCart from './pages/ShoppingCart'
import Profile from './pages/Profile'
import TerminoCondiciones from './pages/TerminoCondiciones'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes'
import PoliticaDeDespacho from './pages/PoliticaDeDespacho'
import Blog from './pages/Blog'
import Checkout from './pages/Checkout';
import EasterEgg from './pages/EasterEgg.jsx';
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductosAdmin from './pages/admin/ProductosAdmin'
import UsuariosAdmin from './pages/admin/UsuariosAdmin'
import OrdenesAdmin from './pages/admin/OrdenesAdmin'
import CategoriasAdmin from './pages/admin/CategoriasAdmin'
import ReportesAdmin from './pages/admin/ReportesAdmin'
import PerfilAdmin from './pages/admin/PerfilAdmin'
import MensajesAdmin from './pages/admin/MensajesAdmin'
import Contacto from './pages/Contacto'
import Ofertas from './pages/Ofertas'
import Categorias from './pages/Categorias'
import CompraExitosa from './pages/CompraExitosa'
import CompraError from './pages/CompraError'

import { CartProvider } from './contexto/CartContext.jsx';


function App() {
  const [filtersVisible, setFiltersVisible] = useState(true);
  return (
      <CartProvider>
          <Routes>
            {/* Tienda: Header + página + Footer */}
            <Route element={<StoreLayout onToggleFilters={() => setFiltersVisible(current => !current)} />}>
              <Route path='/' element={<Home />} />
              <Route path='/Home' element={<Home />} />
              <Route path='/Catalogue' element={<Catalogue filtersVisible={filtersVisible} />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/RecuperarContrasena' element={<RecuperarContrasena />} />
              <Route path='/ShoppingCart' element={<ShoppingCart />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path='/CompraExitosa' element={<CompraExitosa />} />
              <Route path='/CompraError' element={<CompraError />} />
              <Route path='/Contacto' element={<Contacto />} />
              <Route path='/Ofertas' element={<Ofertas />} />
              <Route path='/Categorias' element={<Categorias />} />
              <Route path='/Categorias/:id' element={<Categorias />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/Nosotros' element={<Nosotros />} />
              <Route path='/TerminoCondiciones' element={<TerminoCondiciones />} />
              <Route path='/PreguntasFrecuentes' element={<PreguntasFrecuentes />} />
              <Route path='/PoliticaDeDespacho' element={<PoliticaDeDespacho />} />
              <Route path='/Blog' element={<Blog />} />
              <Route path='/Blog/:id' element={<BlogDetalle />} />
              <Route path='/Product/:code' element={<ProductoDetalle />} />
              <Route path="/EasterEgg" element={<EasterEgg />} />
            </Route>

            {/* Panel de administración: ADMIN ve todo; VENDEDOR solo productos y órdenes (soloAdmin bloquea el resto) */}
            <Route path='/admin' element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminRoute soloAdmin><AdminDashboard /></AdminRoute>} />
              <Route path='ordenes' element={<OrdenesAdmin />} />
              <Route path='productos' element={<ProductosAdmin />} />
              <Route path='productos/criticos' element={<ProductosAdmin soloCriticos />} />
              <Route path='categorias' element={<AdminRoute soloAdmin><CategoriasAdmin /></AdminRoute>} />
              <Route path='usuarios' element={<AdminRoute soloAdmin><UsuariosAdmin /></AdminRoute>} />
              <Route path='mensajes' element={<AdminRoute soloAdmin><MensajesAdmin /></AdminRoute>} />
              <Route path='reportes' element={<AdminRoute soloAdmin><ReportesAdmin /></AdminRoute>} />
              <Route path='perfil' element={<AdminRoute soloAdmin><PerfilAdmin /></AdminRoute>} />
            </Route>
          </Routes>
      </CartProvider>
  );
}

export default App
