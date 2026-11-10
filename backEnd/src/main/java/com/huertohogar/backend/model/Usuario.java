package com.huertohogar.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo no es válido")
    @Column(unique = true, nullable = false)
    private String email;

    // Se guarda el HASH (BCrypt), nunca la contraseña en texto plano.
    // El hash de BCrypt mide 60 caracteres: la columna (VARCHAR 255 por defecto) debe
    // ser de al menos 60, o el login falla siempre con 401 (ver punto 6 de la guía JWT).
    // WRITE_ONLY: se puede recibir en un JSON, pero nunca se devuelve en las respuestas.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    private String telefono;

    private String direccion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol = Rol.CLIENTE;
}
