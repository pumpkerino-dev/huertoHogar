package com.huertohogar.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.model.Usuario;
import com.huertohogar.backend.repository.UsuarioRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * CRUD de usuarios. Todo este controller requiere rol ADMIN (ver SecurityConfig).
 */
@RestController
@RequestMapping("/api/v1/usuarios")
@Tag(name = "Usuarios", description = "Mantenedor de usuarios y roles (solo ADMIN)")
public class UsuarioController {

    private static final String REGEX_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    @Operation(summary = "Listar usuarios")
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un usuario por id")
    public Usuario obtener(@PathVariable Long id) {
        return buscar(id);
    }

    @PostMapping
    @Operation(summary = "Crear usuario", description = "El admin puede asignar rol CLIENTE o ADMIN.")
    public ResponseEntity<Usuario> crear(@Valid @RequestBody Usuario usuario) {
        if (usuarioRepository.existsByEmailIgnoreCase(usuario.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado");
        }
        validarPassword(usuario.getPassword());

        usuario.setId(null);
        usuario.setEmail(usuario.getEmail().trim().toLowerCase());
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        if (usuario.getRol() == null) {
            usuario.setRol(Rol.CLIENTE);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRepository.save(usuario));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar usuario", description = "Si password viene vacío, se mantiene la actual.")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario datos,
                              @Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        Usuario existente = buscar(id);

        if (datos.getNombre() == null || datos.getNombre().isBlank()
                || datos.getEmail() == null || datos.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nombre y correo son obligatorios");
        }

        boolean cambiaEmail = !existente.getEmail().equalsIgnoreCase(datos.getEmail().trim());
        if (cambiaEmail && usuarioRepository.existsByEmailIgnoreCase(datos.getEmail().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado");
        }

        // El token JWT del admin lleva su correo como "subject": si lo cambiara, su propio
        // token dejaría de ser válido y se cerraría su sesión a mitad de la edición.
        if (esUsuarioActual(existente, actual) && cambiaEmail) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No puedes cambiar tu propio correo mientras tienes la sesión iniciada");
        }

        Rol nuevoRol = datos.getRol() != null ? datos.getRol() : existente.getRol();
        if (esUsuarioActual(existente, actual) && nuevoRol != Rol.ADMIN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No puedes quitarte el rol de administrador a ti mismo");
        }

        existente.setNombre(datos.getNombre().trim());
        existente.setEmail(datos.getEmail().trim().toLowerCase());
        existente.setTelefono(datos.getTelefono());
        existente.setDireccion(datos.getDireccion());
        existente.setRol(nuevoRol);

        if (datos.getPassword() != null && !datos.getPassword().isBlank()) {
            validarPassword(datos.getPassword());
            existente.setPassword(passwordEncoder.encode(datos.getPassword()));
        }
        return usuarioRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario", description = "Un admin no puede eliminarse a sí mismo.")
    public ResponseEntity<Void> eliminar(@PathVariable Long id,
                                         @Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        Usuario usuario = buscar(id);
        if (esUsuarioActual(usuario, actual)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No puedes eliminar tu propia cuenta");
        }
        usuarioRepository.delete(usuario);
        return ResponseEntity.noContent().build();
    }

    /** El usuario logueado viene de Spring Security (UserDetails), cuyo "username" es el correo. */
    private boolean esUsuarioActual(Usuario usuario, UserDetails actual) {
        return usuario.getEmail().equalsIgnoreCase(actual.getUsername());
    }

    private Usuario buscar(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    private void validarPassword(String password) {
        if (password == null || !password.matches(REGEX_PASSWORD)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La contraseña debe tener 8+ caracteres, una mayúscula, una minúscula y un número");
        }
    }
}
