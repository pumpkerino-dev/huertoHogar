import { useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Nosotros from './pages/Nosotros'
import Login from './pages/Login'
import RecuperarContrasena from './pages/RecuperarContrasena'
import ShoppingCart from './pages/shoppingCart'
import Profile from './pages/Profile'
import TerminoCondiciones from './pages/TerminoCondiciones'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes'
import PoliticaDeDespacho from './pages/PoliticaDeDespacho'
import Blog from './pages/Blog'
import BlogDetalle from './components/BlogDetalle'
import ProductoDetalle from './components/ProductoDetalle'
import { CartProvider } from './contexto/CartContext.jsx';

function App() {
  const [filtersVisible, setFiltersVisible] = useState(true);
  return (
      <CartProvider>
        <>
          <Header
              onToggleFilters={() => setFiltersVisible(current => !current)}
          />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Catalogue' element={<Catalogue filtersVisible={filtersVisible} />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/RecuperarContrasena' element={<RecuperarContrasena />} />
            <Route path='/ShoppingCart' element={<ShoppingCart />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Nosotros' element={<Nosotros />} />
            <Route path='/TerminoCondiciones' element={<TerminoCondiciones />} />
            <Route path='/PreguntasFrecuentes' element={<PreguntasFrecuentes />} />
            <Route path='/PoliticaDeDespacho' element={<PoliticaDeDespacho />} />
            <Route path='/Blog' element={<Blog />} />
            <Route path='/Blog/:id' element={<BlogDetalle />} />
            <Route path='/Product/:code' element={<ProductoDetalle />} />
          </Routes>

          <Footer />
        </>
      </CartProvider>
  );
}

export default App
