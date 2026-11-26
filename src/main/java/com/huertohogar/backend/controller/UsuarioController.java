package com.huertohogar.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.huertohogar.backend.dto.UsuarioRequest;
import com.huertohogar.backend.dto.UsuarioResponse;
import com.huertohogar.backend.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/usuarios")
@Tag(name = "Usuarios", description = "Mantenedor de usuarios y roles (solo ADMIN)")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    @Operation(summary = "Listar usuarios")
    public List<UsuarioResponse> listar() {
        return usuarioService.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un usuario por id")
    public UsuarioResponse obtener(@PathVariable Long id) {
        return usuarioService.obtener(id);
    }

    @PostMapping
    @Operation(summary = "Crear usuario", description = "Rol ADMIN, VENDEDOR o CLIENTE.")
    public ResponseEntity<UsuarioResponse> crear(@Valid @RequestBody UsuarioRequest datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.crear(datos));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar usuario", description = "Si password viene vacío, se mantiene la actual.")
    public UsuarioResponse actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioRequest datos,
                                      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        return usuarioService.actualizar(id, datos, actual.getUsername());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario", description = "Un admin no puede eliminarse a sí mismo.")
    public ResponseEntity<Void> eliminar(@PathVariable Long id,
                                         @Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        usuarioService.eliminar(id, actual.getUsername());
        return ResponseEntity.noContent().build();
    }
}
