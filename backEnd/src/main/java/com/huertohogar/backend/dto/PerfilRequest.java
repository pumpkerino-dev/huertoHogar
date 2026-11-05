package com.huertohogar.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Datos que un usuario puede cambiar de SU PROPIO perfil (PUT /api/v1/auth/me).
 * No incluye correo (es el "subject" del JWT), ni rol (solo lo cambia un ADMIN).
 */
public record PerfilRequest(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,

        String telefono,

        String direccion) {
}
