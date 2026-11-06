// Lógica pura: validaciones de los formularios (utils/validation.js) y esquema Yup (utils/esquemas.js)
import { describe, test, expect } from 'vitest'
import { sinErrores, validarPerfil, validarRegistro } from '../../utils/validation'
import { esquemaCategoria } from '../../utils/esquemas'

const registroValido = {
  nombre: 'Ana Pérez', email: 'ana@correo.cl', password: 'Clave1234', confirmar: 'Clave1234',
  telefono: '+56 9 1234 5678', direccion: 'Los Aromos 45, Santiago', terminos: true,
}

describe('utils/validation', () => {
  test('validarRegistro acepta datos correctos y detecta contraseñas distintas y términos sin aceptar', () => {
    expect(sinErrores(validarRegistro(registroValido))).toBe(true)
    const errores = validarRegistro({ ...registroValido, confirmar: 'Otra1234', terminos: false })
    expect(errores).toEqual({
      confirmar: 'Las contraseñas no coinciden.',
      terminos: 'Debes aceptar los términos y condiciones.',
    })
  })

  test('validarPerfil deja teléfono y dirección opcionales, pero valida su formato si vienen', () => {
    expect(validarPerfil({ nombre: 'Ana Pérez', telefono: '', direccion: '' })).toEqual({})
    expect(validarPerfil({ nombre: 'Ana', telefono: '123', direccion: '' })).toHaveProperty('telefono')
  })

  test('esquemaCategoria (Yup) exige un nombre de 3 a 40 caracteres y quita los espacios sobrantes', async () => {
    await expect(esquemaCategoria.validate({ nombre: 'Hi' })).rejects.toThrow('El nombre debe tener al menos 3 caracteres.')
    await expect(esquemaCategoria.validate({ nombre: '' })).rejects.toThrow('El nombre es obligatorio.')
    expect(await esquemaCategoria.validate({ nombre: '  Hierbas Aromáticas  ' }))
      .toEqual({ nombre: 'Hierbas Aromáticas', descripcion: '' })
  })
})
