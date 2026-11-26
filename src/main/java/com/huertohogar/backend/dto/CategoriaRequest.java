package com.huertohogar.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoriaRequest(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(min = 3, max = 40, message = "El nombre debe tener entre 3 y 40 caracteres")
        String nombre,

        @Size(max = 200, message = "La descripción no puede superar los 200 caracteres")
        String descripcion) {
}
