package com.huertohogar.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.huertohogar.backend.model.Boleta;
import com.huertohogar.backend.model.EstadoBoleta;

public record BoletaResponse(
        Long id,
        String numero,
        LocalDateTime fecha,
        EstadoBoleta estado,
        Cliente cliente,
        Envio envio,
        String fechaEntrega,
        List<Item> items,
        Integer total) {

    public record Cliente(Long id, String nombre, String email) {
    }

    public record Envio(String nombre, String apellidos, String correo, String calle, String departamento,
                        String region, String comuna, String indicaciones) {
    }

    public record Item(String codigo, String nombre, Integer cantidad, Integer precioUnitario, String categoria) {
    }

    public static BoletaResponse de(Boleta b) {
        Cliente cliente = b.getUsuario() == null
                ? new Cliente(null, b.getNombre() + " " + b.getApellidos(), b.getCorreo())
                : new Cliente(b.getUsuario().getId(),
                        b.getUsuario().getNombre() + " " + b.getUsuario().getApellidos(),
                        b.getUsuario().getEmail());
        Envio envio = new Envio(b.getNombre(), b.getApellidos(), b.getCorreo(), b.getCalle(), b.getDepartamento(),
                b.getRegion(), b.getComuna(), b.getIndicaciones());
        List<Item> items = b.getDetalles().stream()
                .map(d -> new Item(d.getProducto().getCodigo(), d.getProducto().getNombre(), d.getCantidad(),
                        d.getPrecioUnitario(), d.getProducto().getCategoria().getId()))
                .toList();
        return new BoletaResponse(b.getId(), b.getNumero(), b.getFecha(), b.getEstado(), cliente, envio,
                b.getFechaEntrega(), items, b.getTotal());
    }
}
