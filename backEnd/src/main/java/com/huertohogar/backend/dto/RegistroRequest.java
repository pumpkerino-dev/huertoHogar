package com.huertohogar.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * Datos del formulario "Crear Cuenta". No incluye rol:
 * quien se registra desde la tienda SIEMPRE queda como CLIENTE.
 */
public record RegistroRequest(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,

        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo no es válido")
        String email,

        // Mismas reglas que el frontend: 8+ caracteres, mayúscula, minúscula y número
        @NotBlank(message = "La contraseña es obligatoria")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
                 message = "La contraseña debe tener 8+ caracteres, una mayúscula, una minúscula y un número")
        String password,

        String telefono,

        String direccion) {
}
