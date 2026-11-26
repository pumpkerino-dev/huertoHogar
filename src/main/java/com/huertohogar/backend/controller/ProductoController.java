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

import com.huertohogar.backend.dto.ProductoRequest;
import com.huertohogar.backend.dto.ProductoResponse;
import com.huertohogar.backend.service.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/productos")
@Tag(name = "Productos", description = "Catálogo público y mantenedor de productos (ADMIN)")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    @SecurityRequirements
    @Operation(summary = "Listar productos", description = "Filtro opcional por id de categoría: ?categoria=frutas")
    public List<ProductoResponse> listar(@RequestParam(required = false) String categoria) {
        return productoService.listar(categoria);
    }

    @GetMapping("/criticos")
    @SecurityRequirements
    @Operation(summary = "Productos con stock crítico", description = "Stock igual o menor a su stock crítico.")
    public List<ProductoResponse> criticos() {
        return productoService.criticos();
    }

    @GetMapping("/{id}")
    @SecurityRequirements
    @Operation(summary = "Obtener un producto por id")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    public ProductoResponse obtener(@PathVariable Long id) {
        return productoService.obtener(id);
    }

    @GetMapping("/codigo/{codigo}")
    @SecurityRequirements
    @Operation(summary = "Obtener un producto por código", description = "Ej: FR001, VR002, PL001")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    public ProductoResponse obtenerPorCodigo(@PathVariable String codigo) {
        return productoService.obtenerPorCodigo(codigo);
    }

    @PostMapping
    @Operation(summary = "Crear producto (ADMIN)")
    @ApiResponse(responseCode = "201", description = "Producto creado")
    @ApiResponse(responseCode = "409", description = "Código duplicado")
    public ResponseEntity<ProductoResponse> crear(@Valid @RequestBody ProductoRequest datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.crear(datos));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto (ADMIN)")
    public ProductoResponse actualizar(@PathVariable Long id, @Valid @RequestBody ProductoRequest datos) {
        return productoService.actualizar(id, datos);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto (ADMIN)", description = "No se puede eliminar si aparece en boletas.")
    @ApiResponse(responseCode = "204", description = "Producto eliminado")
    @ApiResponse(responseCode = "409", description = "El producto tiene ventas")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
