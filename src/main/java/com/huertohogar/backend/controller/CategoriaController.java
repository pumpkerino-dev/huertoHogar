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
import org.springframework.web.bind.annotation.RestController;

import com.huertohogar.backend.dto.CategoriaRequest;
import com.huertohogar.backend.dto.CategoriaResponse;
import com.huertohogar.backend.service.CategoriaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/categorias")
@Tag(name = "Categorías", description = "Categorías del catálogo (lectura pública, edición ADMIN)")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    @SecurityRequirements
    @Operation(summary = "Listar categorías con su cantidad de productos")
    public List<CategoriaResponse> listar() {
        return categoriaService.listar();
    }

    @GetMapping("/{id}")
    @SecurityRequirements
    @Operation(summary = "Obtener una categoría")
    public CategoriaResponse obtener(@PathVariable String id) {
        return categoriaService.obtener(id);
    }

    @PostMapping
    @Operation(summary = "Crear categoría (ADMIN)")
    @ApiResponse(responseCode = "201", description = "Categoría creada")
    public ResponseEntity<CategoriaResponse> crear(@Valid @RequestBody CategoriaRequest datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.crear(datos));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar categoría (ADMIN)", description = "El id no cambia.")
    public CategoriaResponse actualizar(@PathVariable String id, @Valid @RequestBody CategoriaRequest datos) {
        return categoriaService.actualizar(id, datos);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar categoría (ADMIN)", description = "Solo si no tiene productos.")
    @ApiResponse(responseCode = "204", description = "Categoría eliminada")
    @ApiResponse(responseCode = "409", description = "La categoría tiene productos")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        categoriaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
