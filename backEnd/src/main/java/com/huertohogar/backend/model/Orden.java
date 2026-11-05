package com.huertohogar.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "orden")
@Data
public class Orden {

    @Id
    private String id;

    private LocalDateTime fecha;

    private String estado;

    private String fechaEntrega;

    @Embedded
    private ClienteOrden cliente;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "orden_id")
    private List<ItemOrden> items = new ArrayList<>();

    private Integer total;
}
