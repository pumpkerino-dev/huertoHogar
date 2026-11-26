package com.huertohogar.backend.dto;

import com.huertohogar.backend.model.EstadoBoleta;

import jakarta.validation.constraints.NotNull;

public record EstadoRequest(
        @NotNull(message = "El estado es obligatorio")
        EstadoBoleta estado) {
}
