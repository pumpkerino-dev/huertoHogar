package com.huertohogar.backend.dto;

import com.huertohogar.backend.validacion.CorreoPermitido;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank(message = "El correo es obligatorio")
        @Size(max = 100, message = "El correo no puede superar los 100 caracteres")
        @Email(message = "El correo no es válido")
        @CorreoPermitido
        String email,

        @NotBlank(message = "La contraseña es obligatoria")
        @Size(min = 4, max = 10, message = "La contraseña debe tener entre 4 y 10 caracteres")
        String password) {
}
