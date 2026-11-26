package com.huertohogar.backend.dto;

import java.util.List;

import com.huertohogar.backend.validacion.CorreoPermitido;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record BoletaRequest(
        @NotEmpty(message = "El carrito está vacío.")
        List<@Valid Item> items,

        @NotNull(message = "Faltan los datos de envío")
        @Valid
        Envio envio,

        String fechaEntrega,

        boolean simularFallo) {

    public record Item(
            @NotBlank(message = "Falta el código del producto")
            String codigo,

            @NotNull(message = "Falta la cantidad")
            @Min(value = 1, message = "La cantidad debe ser al menos 1")
            Integer cantidad) {
    }

    public record Envio(
            @NotBlank(message = "El nombre es obligatorio")
            @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
            String nombre,

            @NotBlank(message = "Los apellidos son obligatorios")
            @Size(max = 100, message = "Los apellidos no pueden superar los 100 caracteres")
            String apellidos,

            @NotBlank(message = "El correo es obligatorio")
            @Size(max = 100, message = "El correo no puede superar los 100 caracteres")
            @Email(message = "El correo no es válido")
            @CorreoPermitido
            String correo,

            @NotBlank(message = "La calle es obligatoria")
            @Size(max = 300, message = "La calle no puede superar los 300 caracteres")
            String calle,

            @Size(max = 100, message = "El departamento no puede superar los 100 caracteres")
            String departamento,

            @NotBlank(message = "La región es obligatoria")
            String region,

            @NotBlank(message = "La comuna es obligatoria")
            String comuna,

            @Size(max = 300, message = "Las indicaciones no pueden superar los 300 caracteres")
            String indicaciones) {
    }
}
