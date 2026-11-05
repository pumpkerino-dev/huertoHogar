package com.huertohogar.backend.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.OrdenRequest;
import com.huertohogar.backend.model.ClienteOrden;
import com.huertohogar.backend.model.ItemOrden;
import com.huertohogar.backend.model.Orden;
import com.huertohogar.backend.model.Producto;
import com.huertohogar.backend.repository.OrdenRepository;
import com.huertohogar.backend.repository.ProductoRepository;
import com.huertohogar.backend.repository.UsuarioRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/ordenes")
@Tag(name = "Órdenes", description = "Compras del checkout y boletas")
public class OrdenController {

    private final OrdenRepository ordenRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public OrdenController(OrdenRepository ordenRepository, ProductoRepository productoRepository,
                           UsuarioRepository usuarioRepository) {
        this.ordenRepository = ordenRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    @Operation(summary = "Listar todas las órdenes (ADMIN)")
    public List<Orden> listar() {
        return ordenRepository.findAllByOrderByFechaDesc();
    }

    @GetMapping("/mias")
    @Operation(summary = "Órdenes del usuario logueado")
    public List<Orden> mias(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        return ordenRepository.findByClienteEmailIgnoreCaseOrderByFechaDesc(actual.getUsername());
    }

    @GetMapping("/usuario/{email}")
    @Operation(summary = "Historial de compras de un usuario (ADMIN)")
    public List<Orden> deUsuario(@PathVariable String email) {
        return ordenRepository.findByClienteEmailIgnoreCaseOrderByFechaDesc(email);
    }

    @PostMapping
    @Transactional
    @Operation(summary = "Confirmar una compra",
               description = "Valida stock y cantidades con los datos de la BD, descuenta el stock y guarda la orden. "
                       + "simularFallo=true simula un pago rechazado.")
    @ApiResponse(responseCode = "201", description = "Compra exitosa")
    @ApiResponse(responseCode = "400", description = "Carrito inválido (cantidades o stock)")
    @ApiResponse(responseCode = "402", description = "Pago rechazado (simulado)")
    public ResponseEntity<Orden> crear(@RequestBody OrdenRequest pedido,
                                       @Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        if (pedido.items() == null || pedido.items().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El carrito está vacío.");
        }

        List<String> problemas = new ArrayList<>();
        List<ItemOrden> items = new ArrayList<>();
        List<Producto> productos = new ArrayList<>();
        for (OrdenRequest.Item item : pedido.items()) {
            Producto producto = productoRepository.findByCodigoIgnoreCase(item.codigo()).orElse(null);
            Integer cantidad = item.cantidad();
            if (producto == null) {
                problemas.add("\"" + item.codigo() + "\" ya no está disponible.");
            } else if (cantidad == null || cantidad < 1) {
                problemas.add("La cantidad de \"" + producto.getNombre() + "\" no es válida.");
            } else if (cantidad > producto.getStock()) {
                problemas.add("Solo quedan " + producto.getStock() + " de \"" + producto.getNombre()
                        + "\" (pediste " + cantidad + ").");
            } else {
                productos.add(producto);
                items.add(new ItemOrden(null, producto.getCodigo(), producto.getNombre(), cantidad,
                        producto.getPrecio(), producto.getCategoria()));
            }
        }
        if (!problemas.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.join(" ", problemas));
        }
        if (pedido.simularFallo()) {
            throw new ResponseStatusException(HttpStatus.PAYMENT_REQUIRED,
                    "El pago fue rechazado por el medio de pago. No se realizó ningún cargo.");
        }

        for (int i = 0; i < productos.size(); i++) {
            Producto producto = productos.get(i);
            producto.setStock(producto.getStock() - items.get(i).getCantidad());
        }
        productoRepository.saveAll(productos);

        Orden orden = new Orden();
        orden.setId("HH-" + System.currentTimeMillis());
        orden.setFecha(LocalDateTime.now());
        orden.setEstado("PAGADA");
        orden.setFechaEntrega(pedido.fechaEntrega() == null ? "" : pedido.fechaEntrega());
        orden.setCliente(actual == null
                ? new ClienteOrden(null, "Cliente invitado", "")
                : usuarioRepository.findByEmailIgnoreCase(actual.getUsername())
                        .map(u -> new ClienteOrden(u.getId(), u.getNombre(), u.getEmail()))
                        .orElse(new ClienteOrden(null, "Cliente invitado", "")));
        orden.setItems(items);
        orden.setTotal(items.stream().mapToInt(i -> i.getPrecioUnitario() * i.getCantidad()).sum());
        return ResponseEntity.status(HttpStatus.CREATED).body(ordenRepository.save(orden));
    }
}
