package com.huertohogar.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record VerificarCodigoRequest(
        @NotBlank(message = "El correo es obligatorio")
        String email,

        @NotBlank(message = "El código es obligatorio")
        @Pattern(regexp = "^\\d{6}$", message = "El código tiene 6 números")
        String codigo) {
}
