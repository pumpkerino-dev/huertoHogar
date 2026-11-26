package com.huertohogar.backend.dto;

import com.huertohogar.backend.model.Producto;

public record ProductoResponse(
        Long id,
        String codigo,
        String nombre,
        String descripcion,
        String categoria,
        String categoriaNombre,
        Integer precio,
        Integer precioOriginal,
        String unidad,
        Integer stock,
        Integer stockCritico,
        boolean critico,
        String origen,
        String imagen,
        String descripcionCorta,
        String estrellas,
        String origenFiltro,
        String certificacion,
        String detalle) {

    public static ProductoResponse de(Producto p) {
        return new ProductoResponse(p.getId(), p.getCodigo(), p.getNombre(), p.getDescripcion(),
                p.getCategoria().getId(), p.getCategoria().getNombre(), p.getPrecio(), p.getPrecioOriginal(),
                p.getUnidad(), p.getStock(), p.getStockCritico(), p.esCritico(), p.getOrigen(), p.getImagen(),
                p.getDescripcionCorta(), p.getEstrellas(), p.getOrigenFiltro(), p.getCertificacion(), p.getDetalle());
    }
}
