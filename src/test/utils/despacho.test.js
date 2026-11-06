// Lógica pura: días de despacho del carrito (utils/despacho.js)
import { describe, test, expect } from 'vitest'
import { formatoDiaDespacho, proximosDias } from '../../utils/despacho'

describe('utils/despacho', () => {
  test('ofrece los 7 días siguientes y bloquea el domingo', () => {
    const dias = proximosDias(new Date(2026, 10, 4)) // miércoles 4 de noviembre de 2026
    expect(dias).toHaveLength(7)
    expect(dias[0]).toMatchObject({ iso: '2026-11-05', diaSemana: 'Jue', bloqueado: false })
    expect(dias.find((d) => d.diaSemana === 'Dom')).toMatchObject({ iso: '2026-11-08', bloqueado: true })
  })

  test('muestra la fecha elegida en palabras', () => {
    expect(formatoDiaDespacho('2026-11-05')).toMatch(/jueves.*5.*noviembre/)
    expect(formatoDiaDespacho('')).toBe('')
  })
})
