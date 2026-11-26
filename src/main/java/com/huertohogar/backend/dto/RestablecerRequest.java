package com.huertohogar.backend.dto;

import com.huertohogar.backend.validacion.Validaciones;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RestablecerRequest(
        @NotBlank(message = "El correo es obligatorio")
        String email,

        @NotBlank(message = "El código es obligatorio")
        @Pattern(regexp = "^\\d{6}$", message = "El código tiene 6 números")
        String codigo,

        @NotBlank(message = "La contraseña es obligatoria")
        @Pattern(regexp = Validaciones.REGEX_PASSWORD, message = Validaciones.MENSAJE_PASSWORD)
        String password) {
}
