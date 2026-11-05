package com.huertohogar.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteOrden {

    @Column(name = "cliente_id")
    private Long id;

    @Column(name = "cliente_nombre")
    private String nombre;

    @Column(name = "cliente_email")
    private String email;
}
