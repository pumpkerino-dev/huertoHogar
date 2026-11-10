package com.huertohogar.backend.controller;

import java.text.Normalizer;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.CategoriaResponse;
import com.huertohogar.backend.model.Categoria;
import com.huertohogar.backend.repository.CategoriaRepository;
import com.huertohogar.backend.repository.ProductoRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/categorias")
@Tag(name = "Categorías", description = "Categorías del catálogo (lectura pública, edición ADMIN)")
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    public CategoriaController(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
    }

    @GetMapping
    @SecurityRequirements
    @Operation(summary = "Listar categorías con su cantidad de productos")
    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream().map(this::respuesta).toList();
    }

    @PostMapping
    @Operation(summary = "Crear categoría (ADMIN)")
    public ResponseEntity<CategoriaResponse> crear(@Valid @RequestBody Categoria datos) {
        String id = crearId(datos.getNombre());
        if (id.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de la categoría es obligatorio");
        }
        if (categoriaRepository.existsById(id) || categoriaRepository.existsByNombreIgnoreCase(datos.getNombre().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una categoría con ese nombre");
        }
        Categoria categoria = new Categoria();
        categoria.setId(id);
        categoria.setNombre(datos.getNombre().trim());
        categoria.setDescripcion(datos.getDescripcion() == null ? "" : datos.getDescripcion().trim());
        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta(categoriaRepository.save(categoria)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar categoría (ADMIN)", description = "El id no cambia, para que los productos sigan asociados.")
    public CategoriaResponse actualizar(@PathVariable String id, @Valid @RequestBody Categoria datos) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));
        if (categoriaRepository.existsByNombreIgnoreCaseAndIdNot(datos.getNombre().trim(), id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una categoría con ese nombre");
        }
        categoria.setNombre(datos.getNombre().trim());
        categoria.setDescripcion(datos.getDescripcion() == null ? "" : datos.getDescripcion().trim());
        return respuesta(categoriaRepository.save(categoria));
    }

    private CategoriaResponse respuesta(Categoria c) {
        return new CategoriaResponse(c.getId(), c.getNombre(), c.getDescripcion(), productoRepository.countByCategoria(c.getId()));
    }

    private static String crearId(String nombre) {
        if (nombre == null) {
            return "";
        }
        String sinTildes = Normalizer.normalize(nombre, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        return sinTildes.toLowerCase().trim().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
