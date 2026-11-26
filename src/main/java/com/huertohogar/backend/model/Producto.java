package com.huertohogar.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "producto")
@Getter
@Setter
@NoArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String codigo;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 500)
    private String descripcion;

    @ManyToOne(optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Column(nullable = false)
    private Integer precio;

    private Integer precioOriginal;

    @Column(length = 50)
    private String unidad;

    @Column(nullable = false)
    private Integer stock;

    private Integer stockCritico;

    @Column(length = 100)
    private String origen;

    @Column(length = 300)
    private String imagen;

    @Column(length = 300)
    private String descripcionCorta;

    @Column(length = 10)
    private String estrellas;

    @Column(length = 50)
    private String origenFiltro;

    @Column(length = 50)
    private String certificacion;

    @Column(length = 5000)
    private String detalle;

    public boolean esCritico() {
        return stockCritico != null && stock != null && stock <= stockCritico;
    }
}
