// Lógica pura: validaciones de los formularios (utils/validation.js) y esquema Yup (utils/esquemas.js)
import { describe, test, expect } from 'vitest'
import {
  isCorreoPermitido, isValidRun, sinErrores, validarLogin, validarPerfil, validarRegistro,
} from '../../utils/validation'
import { esquemaCategoria } from '../../utils/esquemas'

const registroValido = {
  run: '10.000.013-K', nombre: 'Ana', apellidos: 'Pérez Rojas', email: 'ana@gmail.com', password: 'Clave1234',
  confirmar: 'Clave1234', fechaNacimiento: '2000-05-20', telefono: '+56 9 1234 5678',
  region: 'Región de Los Lagos', comuna: 'Puerto Montt', direccion: 'Los Aromos 45', terminos: true,
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

  test('validarPerfil deja teléfono y fecha de nacimiento opcionales, pero valida su formato si vienen', () => {
    const perfil = { ...registroValido, telefono: '', fechaNacimiento: '' }
    expect(validarPerfil(perfil)).toEqual({})
    expect(validarPerfil({ ...perfil, telefono: '123' })).toHaveProperty('telefono')
    expect(validarPerfil({ ...perfil, fechaNacimiento: '2999-01-01' })).toHaveProperty('fechaNacimiento')
  })

  test('el RUN se valida con el dígito verificador (módulo 11) y sin importar puntos ni guion', () => {
    expect(isValidRun('10000013K')).toBe(true)
    expect(isValidRun('12.345.678-5')).toBe(true)
    expect(isValidRun('12345678-9')).toBe(false)
    expect(isValidRun('12')).toBe(false)
  })

  test('solo se aceptan correos @duoc.cl, @profesor.duoc.cl y @gmail.com', () => {
    expect(isCorreoPermitido('ana@duoc.cl')).toBe(true)
    expect(isCorreoPermitido('profe@profesor.duoc.cl')).toBe(true)
    expect(isCorreoPermitido('Ana@GMAIL.com')).toBe(true)
    expect(isCorreoPermitido('ana@hotmail.com')).toBe(false)
    expect(validarLogin({ email: 'ana@gmail.com', password: 'abc' })).toEqual({
      password: 'La contraseña debe tener entre 4 y 10 caracteres.',
    })
  })

  test('esquemaCategoria (Yup) exige un nombre de 3 a 40 caracteres y quita los espacios sobrantes', async () => {
    await expect(esquemaCategoria.validate({ nombre: 'Hi' })).rejects.toThrow('El nombre debe tener al menos 3 caracteres.')
    await expect(esquemaCategoria.validate({ nombre: '' })).rejects.toThrow('El nombre es obligatorio.')
    expect(await esquemaCategoria.validate({ nombre: '  Hierbas Aromáticas  ' }))
      .toEqual({ nombre: 'Hierbas Aromáticas', descripcion: '' })
  })
})
