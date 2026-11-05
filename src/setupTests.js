// ============================================================
// CONFIGURACIÓN DEL ENTORNO DE PRUEBAS
// Vitest ejecuta este archivo antes de cada archivo de prueba
// (se indica en vite.config.js -> test.setupFiles).
// ============================================================
import '@testing-library/jest-dom/vitest' // agrega matchers como toBeInTheDocument()
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()             // desmonta los componentes renderizados
  localStorage.clear()  // borra carrito, sesión y BD emulada entre pruebas
  sessionStorage.clear()
  vi.clearAllMocks()    // limpia el historial de llamadas de los mocks
})
