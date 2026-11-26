package com.huertohogar.backend.dto;

import java.time.LocalDate;

import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.validacion.CorreoPermitido;
import com.huertohogar.backend.validacion.Run;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

public record UsuarioRequest(
        @NotBlank(message = "El RUN es obligatorio")
        @Size(min = 7, max = 9, message = "El RUN debe tener entre 7 y 9 caracteres")
        @Run
        String run,

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
        String email,

        String password,

        @Past(message = "La fecha de nacimiento debe ser anterior a hoy")
        LocalDate fechaNacimiento,

        @Size(max = 20, message = "El teléfono no puede superar los 20 caracteres")
        String telefono,

        @NotBlank(message = "La región es obligatoria")
        String region,

        @NotBlank(message = "La comuna es obligatoria")
        String comuna,

        @NotBlank(message = "La dirección es obligatoria")
        @Size(max = 300, message = "La dirección no puede superar los 300 caracteres")
        String direccion,

        @NotNull(message = "El tipo de usuario es obligatorio")
        Rol rol) {
}
