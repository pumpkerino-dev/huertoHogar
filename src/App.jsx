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
import BlogN from './pages/BlogN'
import BlogN1 from './pages/BlogN1'
import BlogN2 from './pages/BlogN2'
import BlogN3 from './pages/BlogN3'
import BlogN4 from './pages/BlogN4' 
import BlogN5 from './pages/Blogn5'
import BlogN6 from './pages/BlogN6'
import ProductN1 from './pages/ProductN1'
import ProductN2 from './pages/ProductN2'
import ProductN3 from './pages/ProductN3'
import ProductN4 from './pages/ProductN4'
import ProductN5 from './pages/ProductN5'
import ProductN6 from './pages/ProductN6'
import ProductN7 from './pages/ProductN7'
import ProductN8 from './pages/ProductN8'
import ProductN9 from './pages/ProductN9'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Catalogue' element={<Catalogue/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/RecuperarContrasena' element={<RecuperarContrasena/>}/>
      <Route path='/ShoppingCart' element={<ShoppingCart/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/Nosotros' element={<Nosotros/>}/>
      <Route path='/TerminoCondiciones' element={<TerminoCondiciones/>}/>
      <Route path='/PreguntasFrecuentes' element={<PreguntasFrecuentes/>}/>
      <Route path='/PoliticaDeDespacho' element={<PoliticaDeDespacho/>}/>
      <Route path='/Blog' element={<Blog/>}/>
      <Route path='/BlogN' element={<BlogN/>}/>
      <Route path='/BlogN1' element={<BlogN1/>}/>
      <Route path='/BlogN2' element={<BlogN2/>}/>
      <Route path='/BlogN3' element={<BlogN3/>}/>
      <Route path='/BlogN4' element={<BlogN4/>}/>
      <Route path='/BlogN5' element={<BlogN5/>}/>
      <Route path='/BlogN6' element={<BlogN6/>}/>
      <Route path='/ProductN1' element={<ProductN1/>}/>
      <Route path='/ProductN2' element={<ProductN2/>}/>
      <Route path='/ProductN3' element={<ProductN3/>}/>
      <Route path='/ProductN4' element={<ProductN4/>}/>
      <Route path='/ProductN5' element={<ProductN5/>}/>
      <Route path='/ProductN6' element={<ProductN6/>}/>
      <Route path='/ProductN7' element={<ProductN7/>}/>
      <Route path='/ProductN8' element={<ProductN8/>}/>
      <Route path='/ProductN9' element={<ProductN9/>}/>
    </Routes>
    <Footer></Footer>
    </>
  )
}

export default App
