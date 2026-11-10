import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap primero, para que los CSS propios del proyecto tengan prioridad sobre él
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// Bootstrap con los colores de HuertoHogar (variables de App.css)
import './css/bootstrap-tema.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexto/AuthProvider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
