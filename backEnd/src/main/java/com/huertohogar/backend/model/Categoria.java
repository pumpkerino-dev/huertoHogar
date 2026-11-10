package com.huertohogar.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "categoria")
@Data
public class Categoria {

    @Id
    private String id;

    @NotBlank(message = "El nombre es obligatorio.")
    @Size(min = 3, max = 40, message = "El nombre debe tener entre 3 y 40 caracteres.")
    @Column(unique = true, nullable = false)
    private String nombre;

    @Size(max = 200, message = "La descripción no puede superar los 200 caracteres.")
    private String descripcion;
}
