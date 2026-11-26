package com.huertohogar.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.BoletaRequest;
import com.huertohogar.backend.dto.BoletaResponse;
import com.huertohogar.backend.model.Boleta;
import com.huertohogar.backend.model.DetalleBoleta;
import com.huertohogar.backend.model.EstadoBoleta;
import com.huertohogar.backend.model.Producto;
import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.model.Usuario;
import com.huertohogar.backend.repository.BoletaRepository;
import com.huertohogar.backend.repository.ProductoRepository;
import com.huertohogar.backend.repository.UsuarioRepository;

@Service
public class BoletaService {

    static final String PAGO_RECHAZADO = "El pago fue rechazado por el medio de pago. No se realizó ningún cargo.";

    private final BoletaRepository boletaRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public BoletaService(BoletaRepository boletaRepository, ProductoRepository productoRepository,
                         UsuarioRepository usuarioRepository) {
        this.boletaRepository = boletaRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public BoletaResponse crear(BoletaRequest pedido, String emailActual) {
        List<String> problemas = new ArrayList<>();
        List<DetalleBoleta> detalles = new ArrayList<>();
        for (BoletaRequest.Item item : pedido.items()) {
            Producto producto = productoRepository.findByCodigoIgnoreCase(item.codigo()).orElse(null);
            if (producto == null) {
                problemas.add("\"" + item.codigo() + "\" ya no está disponible.");
            } else if (item.cantidad() > producto.getStock()) {
                problemas.add("Solo quedan " + producto.getStock() + " de \"" + producto.getNombre()
                        + "\" (pediste " + item.cantidad() + ").");
            } else {
                detalles.add(new DetalleBoleta(producto, item.cantidad(), producto.getPrecio()));
            }
        }
        if (!problemas.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.join(" ", problemas));
        }
        if (pedido.simularFallo()) {
            throw new ResponseStatusException(HttpStatus.PAYMENT_REQUIRED, PAGO_RECHAZADO);
        }

        Boleta boleta = new Boleta();
        boleta.setNumero("HH-" + System.currentTimeMillis());
        boleta.setFecha(LocalDateTime.now());
        boleta.setEstado(EstadoBoleta.EN_PREPARACION);
        if (emailActual != null) {
            usuarioRepository.findByEmailIgnoreCase(emailActual).ifPresent(boleta::setUsuario);
        }
        BoletaRequest.Envio envio = pedido.envio();
        boleta.setNombre(envio.nombre().trim());
        boleta.setApellidos(envio.apellidos().trim());
        boleta.setCorreo(envio.correo().trim().toLowerCase());
        boleta.setCalle(envio.calle().trim());
        boleta.setDepartamento(envio.departamento());
        boleta.setRegion(envio.region());
        boleta.setComuna(envio.comuna());
        boleta.setIndicaciones(envio.indicaciones());
        boleta.setFechaEntrega(pedido.fechaEntrega() == null ? "" : pedido.fechaEntrega());

        int total = 0;
        for (DetalleBoleta detalle : detalles) {
            Producto producto = detalle.getProducto();
            producto.setStock(producto.getStock() - detalle.getCantidad());
            boleta.agregarDetalle(detalle);
            total += detalle.subtotal();
        }
        boleta.setTotal(total);
        return BoletaResponse.de(boletaRepository.save(boleta));
    }

    @Transactional(readOnly = true)
    public List<BoletaResponse> listar() {
        return boletaRepository.findAllByOrderByFechaDesc().stream().map(BoletaResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public BoletaResponse obtener(Long id, String emailActual) {
        Boleta boleta = buscar(id);
        Usuario actual = usuarioRepository.findByEmailIgnoreCase(emailActual)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Debes iniciar sesión"));
        boolean esPersonal = actual.getRol() == Rol.ADMIN || actual.getRol() == Rol.VENDEDOR;
        boolean esDueno = boleta.getUsuario() != null && boleta.getUsuario().getId().equals(actual.getId());
        if (!esPersonal && !esDueno) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permisos para ver esta boleta");
        }
        return BoletaResponse.de(boleta);
    }

    @Transactional(readOnly = true)
    public List<BoletaResponse> mias(String emailActual) {
        Usuario actual = usuarioRepository.findByEmailIgnoreCase(emailActual)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Debes iniciar sesión"));
        return deUsuario(actual.getId());
    }

    @Transactional(readOnly = true)
    public List<BoletaResponse> deUsuario(Long usuarioId) {
        return boletaRepository.findByUsuario_IdOrderByFechaDesc(usuarioId).stream()
                .map(BoletaResponse::de)
                .toList();
    }

    @Transactional
    public BoletaResponse cambiarEstado(Long id, EstadoBoleta estado) {
        Boleta boleta = buscar(id);
        if (boleta.getEstado() == EstadoBoleta.CANCELADA || boleta.getEstado() == EstadoBoleta.ENTREGADO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La boleta ya está " + boleta.getEstado() + " y no puede cambiar de estado");
        }
        if (estado == EstadoBoleta.CANCELADA) {
            boleta.getDetalles().forEach(d -> d.getProducto().setStock(d.getProducto().getStock() + d.getCantidad()));
        }
        boleta.setEstado(estado);
        return BoletaResponse.de(boletaRepository.save(boleta));
    }

    private Boleta buscar(Long id) {
        return boletaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Boleta no encontrada"));
    }
}
