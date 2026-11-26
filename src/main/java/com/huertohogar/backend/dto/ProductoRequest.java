package com.huertohogar.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductoRequest(
        @NotBlank(message = "El código es obligatorio")
        @Size(min = 3, max = 20, message = "El código debe tener al menos 3 caracteres")
        String codigo,

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
        String nombre,

        @Size(max = 500, message = "La descripción no puede superar los 500 caracteres")
        String descripcion,

        @NotBlank(message = "La categoría es obligatoria")
        String categoria,

        @NotNull(message = "El precio es obligatorio")
        @Min(value = 0, message = "El precio no puede ser negativo")
        Integer precio,

        @Min(value = 0, message = "El precio original no puede ser negativo")
        Integer precioOriginal,

        @Size(max = 50, message = "La unidad no puede superar los 50 caracteres")
        String unidad,

        @NotNull(message = "El stock es obligatorio")
        @Min(value = 0, message = "El stock no puede ser negativo")
        Integer stock,

        @Min(value = 0, message = "El stock crítico no puede ser negativo")
        Integer stockCritico,

        @Size(max = 100, message = "El origen no puede superar los 100 caracteres")
        String origen,

        @Size(max = 300, message = "La ruta de la imagen no puede superar los 300 caracteres")
        String imagen,

        String descripcionCorta,
        String estrellas,
        String origenFiltro,
        String certificacion,
        String detalle) {
}
