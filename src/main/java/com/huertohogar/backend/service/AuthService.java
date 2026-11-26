package com.huertohogar.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.AuthResponse;
import com.huertohogar.backend.dto.LoginRequest;
import com.huertohogar.backend.dto.PerfilRequest;
import com.huertohogar.backend.dto.RegistroRequest;
import com.huertohogar.backend.dto.UsuarioResponse;
import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.model.Usuario;
import com.huertohogar.backend.repository.UsuarioRepository;
import com.huertohogar.backend.security.JwtService;
import com.huertohogar.backend.validacion.Validaciones;

import io.jsonwebtoken.JwtException;

@Service
public class AuthService {

    static final String CREDENCIALES_INVALIDAS = "Correo o contraseña incorrectos";

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, CREDENCIALES_INVALIDAS));
        if (!passwordEncoder.matches(request.password(), usuario.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, CREDENCIALES_INVALIDAS);
        }
        return emitirTokens(usuario);
    }

    @Transactional
    public AuthResponse registrar(RegistroRequest request) {
        String email = request.email().trim().toLowerCase();
        String run = Validaciones.normalizarRun(request.run());
        if (usuarioRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado");
        }
        if (usuarioRepository.existsByRun(run)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este RUN ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setRun(run);
        usuario.setNombre(request.nombre().trim());
        usuario.setApellidos(request.apellidos().trim());
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(request.password()));
        usuario.setFechaNacimiento(request.fechaNacimiento());
        usuario.setTelefono(request.telefono());
        usuario.setRegion(request.region());
        usuario.setComuna(request.comuna());
        usuario.setDireccion(request.direccion().trim());
        usuario.setRol(Rol.CLIENTE);
        return emitirTokens(usuarioRepository.save(usuario));
    }

    @Transactional(readOnly = true)
    public AuthResponse refrescar(String refreshToken) {
        String email;
        try {
            email = jwtService.validarTokenRefresco(refreshToken);
        } catch (JwtException | IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "La sesión expiró, vuelve a iniciar sesión");
        }
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "La sesión expiró, vuelve a iniciar sesión"));
        return emitirTokens(usuario);
    }

    @Transactional(readOnly = true)
    public UsuarioResponse usuarioActual(String email) {
        return UsuarioResponse.de(buscar(email));
    }

    @Transactional
    public UsuarioResponse actualizarPerfil(String email, PerfilRequest datos) {
        Usuario usuario = buscar(email);
        usuario.setNombre(datos.nombre().trim());
        usuario.setApellidos(datos.apellidos().trim());
        usuario.setFechaNacimiento(datos.fechaNacimiento());
        usuario.setTelefono(datos.telefono());
        usuario.setRegion(datos.region());
        usuario.setComuna(datos.comuna());
        usuario.setDireccion(datos.direccion().trim());
        return UsuarioResponse.de(usuarioRepository.save(usuario));
    }

    private AuthResponse emitirTokens(Usuario usuario) {
        return new AuthResponse(
                jwtService.generarTokenAcceso(usuario.getEmail(), usuario.getRol().name()),
                jwtService.generarTokenRefresco(usuario.getEmail()),
                UsuarioResponse.de(usuario));
    }

    private Usuario buscar(String email) {
        return usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, CREDENCIALES_INVALIDAS));
    }
}
