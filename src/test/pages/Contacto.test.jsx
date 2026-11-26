// Página: Contacto (formulario validado que se envía al backend)
import { describe, test, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contacto from '../../pages/Contacto'
import * as contactoService from '../../services/contactoService'
import { renderConProveedores } from '../test-utils'

vi.mock('../../services/contactoService')

describe('Contacto', () => {
  test('no envía si el correo no es de un dominio permitido o falta el comentario', async () => {
    renderConProveedores(<Contacto />, { ruta: '/Contacto' })
    await userEvent.type(screen.getByLabelText('Nombre completo'), 'Juan Pérez')
    await userEvent.type(screen.getByLabelText('Correo'), 'juan@hotmail.com')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByText('Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.')).toBeInTheDocument()
    expect(screen.getByText('Escribe tu comentario.')).toBeInTheDocument()
    expect(contactoService.enviarMensaje).not.toHaveBeenCalled()
  })

  test('con datos válidos envía el mensaje y confirma al usuario', async () => {
    contactoService.enviarMensaje.mockResolvedValue({ id: 1 })
    renderConProveedores(<Contacto />, { ruta: '/Contacto' })
    await userEvent.type(screen.getByLabelText('Nombre completo'), 'Juan Pérez')
    await userEvent.type(screen.getByLabelText('Correo'), 'juan@gmail.com')
    await userEvent.type(screen.getByLabelText('Comentario'), '¿Despachan a Puerto Montt?')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(await screen.findByText('¡Gracias! Recibimos tu mensaje y te responderemos pronto.')).toBeInTheDocument()
    expect(contactoService.enviarMensaje).toHaveBeenCalledWith({
      nombre: 'Juan Pérez', correo: 'juan@gmail.com', comentario: '¿Despachan a Puerto Montt?',
    })
  })
})
