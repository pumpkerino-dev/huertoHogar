import * as yup from 'yup';

// ============================================================
// ESQUEMAS DE VALIDACIÓN CON YUP (enfoque "React Hook Form + Yup" del tutorial de formularios)
// Las reglas se declaran en un objeto, en vez de escribir if por cada campo.
// Los demás formularios del proyecto usan el enfoque nativo (useState + utils/validation.js).
// ============================================================

export const esquemaCategoria = yup.object({
  nombre: yup
    .string()
    .trim()
    .required('El nombre es obligatorio.')
    .min(3, 'El nombre debe tener al menos 3 caracteres.')
    .max(40, 'El nombre no puede superar los 40 caracteres.'),
  descripcion: yup
    .string()
    .trim()
    .max(200, 'La descripción no puede superar los 200 caracteres.')
    .default(''),
});
