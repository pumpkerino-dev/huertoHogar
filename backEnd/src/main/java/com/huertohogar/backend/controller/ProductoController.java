package com.huertohogar.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.model.Producto;
import com.huertohogar.backend.repository.ProductoRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * CRUD de productos.
 * GET es público (catálogo). POST / PUT / DELETE requieren rol ADMIN (ver SecurityConfig).
 */
@RestController
@RequestMapping("/api/v1/productos")
@Tag(name = "Productos", description = "Catálogo (público) y mantenedor de productos (ADMIN)")
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /** GET /api/v1/productos  o  /api/v1/productos?categoria=frutas */
    @GetMapping
    @SecurityRequirements
    @Operation(summary = "Listar productos", description = "Filtro opcional: ?categoria=frutas|verduras|organicos|lacteos")
    public List<Producto> listar(@RequestParam(required = false) String categoria) {
        if (categoria != null && !categoria.isBlank()) {
            return productoRepository.findByCategoriaIgnoreCase(categoria);
        }
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    @SecurityRequirements
    @Operation(summary = "Obtener un producto por id")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    public Producto obtener(@PathVariable Long id) {
        return buscar(id);
    }

    /** GET /api/v1/productos/codigo/FR001 (la tienda usa el código en la URL: /Product/FR001) */
    @GetMapping("/codigo/{codigo}")
    @SecurityRequirements
    @Operation(summary = "Obtener un producto por código", description = "Ej: FR001, VR002, PL001")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    public Producto obtenerPorCodigo(@PathVariable String codigo) {
        return productoRepository.findByCodigoIgnoreCase(codigo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    @PostMapping
    @Operation(summary = "Crear producto (ADMIN)")
    @ApiResponse(responseCode = "201", description = "Producto creado")
    @ApiResponse(responseCode = "409", description = "Código duplicado")
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        if (productoRepository.existsByCodigoIgnoreCase(producto.getCodigo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un producto con ese código");
        }
        validarOferta(producto);
        producto.setId(null); // el id lo asigna la BD
        return ResponseEntity.status(HttpStatus.CREATED).body(productoRepository.save(producto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto (ADMIN)")
    public Producto actualizar(@PathVariable Long id, @Valid @RequestBody Producto datos) {
        Producto existente = buscar(id);

        boolean cambiaCodigo = !existente.getCodigo().equalsIgnoreCase(datos.getCodigo());
        if (cambiaCodigo && productoRepository.existsByCodigoIgnoreCase(datos.getCodigo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un producto con ese código");
        }
        validarOferta(datos);

        existente.setCodigo(datos.getCodigo());
        existente.setNombre(datos.getNombre());
        existente.setDescripcion(datos.getDescripcion());
        existente.setCategoria(datos.getCategoria());
        existente.setPrecio(datos.getPrecio());
        existente.setPrecioOriginal(datos.getPrecioOriginal());
        existente.setUnidad(datos.getUnidad());
        existente.setStock(datos.getStock());
        existente.setOrigen(datos.getOrigen());
        existente.setImagen(datos.getImagen());
        return productoRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto (ADMIN)")
    @ApiResponse(responseCode = "204", description = "Producto eliminado")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoRepository.delete(buscar(id));
        return ResponseEntity.noContent().build();
    }

    private Producto buscar(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    /** Si el producto está en oferta, el precio original debe ser mayor al precio de oferta. */
    private void validarOferta(Producto p) {
        if (p.getPrecioOriginal() != null && p.getPrecioOriginal() <= p.getPrecio()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "El precio original debe ser mayor que el precio de oferta");
        }
    }
}
