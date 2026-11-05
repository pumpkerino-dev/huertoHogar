package com.huertohogar.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.LoginRequest;
import com.huertohogar.backend.dto.LoginResponse;
import com.huertohogar.backend.dto.PerfilRequest;
import com.huertohogar.backend.dto.RegistroRequest;
import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.model.Usuario;
import com.huertohogar.backend.repository.UsuarioRepository;
import com.huertohogar.backend.security.JwtService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * Controlador de Autenticación (sección 4.5 de la guía).
 *
 * Diferencias con la guía:
 *  - Ruta /api/v1/auth (la pauta de la Ev3 pide versionar los endpoints con /v1/).
 *  - El login responde { token, usuario }: el frontend necesita el ROL para decidir
 *    si mandar al usuario al panel /admin o a su perfil.
 *  - Un único mensaje "Correo o contraseña incorrectos". La guía responde distinto si el
 *    usuario no existe o si la clave está mal; eso permite a un atacante averiguar qué
 *    correos están registrados (enumeración de usuarios).
 *  - Sin @CrossOrigin: CORS ya está configurado en SecurityConfig, igual que en la guía.
 */
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Autenticación", description = "Login, registro y datos de la sesión (JWT)")
public class AuthController {

    private static final String CREDENCIALES_INVALIDAS = "Correo o contraseña incorrectos";

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public AuthController(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder,
                          JwtService jwtService, UsuarioRepository usuarioRepository) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    @SecurityRequirements // público: no requiere token
    @Operation(summary = "Iniciar sesión", description = "Devuelve un JWT y los datos del usuario (con su rol).")
    @ApiResponse(responseCode = "200", description = "Login correcto")
    @ApiResponse(responseCode = "401", description = "Correo o contraseña incorrectos")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        String username = loginRequest.email().trim();
        String password = loginRequest.password();

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (passwordEncoder.matches(password, userDetails.getPassword())) {
                String token = jwtService.generateToken(userDetails.getUsername());
                Usuario usuario = buscarPorEmail(userDetails.getUsername());
                return ResponseEntity.ok(new LoginResponse(token, usuario));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("mensaje", CREDENCIALES_INVALIDAS));
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("mensaje", CREDENCIALES_INVALIDAS));
        }
    }

    @PostMapping("/registro")
    @SecurityRequirements
    @Operation(summary = "Crear cuenta", description = "Registra un usuario con rol CLIENTE y devuelve su JWT.")
    @ApiResponse(responseCode = "201", description = "Cuenta creada")
    @ApiResponse(responseCode = "409", description = "El correo ya está registrado")
    public ResponseEntity<LoginResponse> registro(@Valid @RequestBody RegistroRequest request) {
        if (usuarioRepository.existsByEmailIgnoreCase(request.email().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre().trim());
        usuario.setEmail(request.email().trim().toLowerCase());
        usuario.setPassword(passwordEncoder.encode(request.password()));
        usuario.setTelefono(request.telefono());
        usuario.setDireccion(request.direccion());
        usuario.setRol(Rol.CLIENTE); // el registro público nunca crea administradores

        Usuario guardado = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new LoginResponse(jwtService.generateToken(guardado.getEmail()), guardado));
    }

    @GetMapping("/me")
    @Operation(summary = "Usuario actual", description = "Devuelve el usuario dueño del token enviado.")
    @ApiResponse(responseCode = "401", description = "Token ausente, inválido o expirado")
    public Usuario me(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        return buscarPorEmail(userDetails.getUsername());
    }

    @PutMapping("/me")
    @Operation(summary = "Actualizar mi perfil",
               description = "El usuario logueado cambia su nombre, teléfono y dirección. No puede cambiar su rol ni su correo.")
    @ApiResponse(responseCode = "401", description = "Token ausente, inválido o expirado")
    public Usuario actualizarPerfil(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
                                    @Valid @RequestBody PerfilRequest datos) {
        Usuario usuario = buscarPorEmail(userDetails.getUsername());
        usuario.setNombre(datos.nombre().trim());
        usuario.setTelefono(datos.telefono());
        usuario.setDireccion(datos.direccion());
        return usuarioRepository.save(usuario);
    }

    private Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, CREDENCIALES_INVALIDAS));
    }
}
