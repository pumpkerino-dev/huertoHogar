package com.huertohogar.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.UsuarioRequest;
import com.huertohogar.backend.dto.UsuarioResponse;
import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.model.Usuario;
import com.huertohogar.backend.repository.BoletaRepository;
import com.huertohogar.backend.repository.UsuarioRepository;
import com.huertohogar.backend.validacion.Validaciones;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BoletaRepository boletaRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, BoletaRepository boletaRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.boletaRepository = boletaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listar() {
        return usuarioRepository.findAll().stream().map(UsuarioResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtener(Long id) {
        return UsuarioResponse.de(buscar(id));
    }

    @Transactional
    public UsuarioResponse crear(UsuarioRequest datos) {
        String email = datos.email().trim().toLowerCase();
        String run = Validaciones.normalizarRun(datos.run());
        if (usuarioRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado");
        }
        if (usuarioRepository.existsByRun(run)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este RUN ya está registrado");
        }
        validarPassword(datos.password());
        Usuario usuario = new Usuario();
        copiar(datos, usuario);
        usuario.setRun(run);
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(datos.password()));
        usuario.setRol(datos.rol());
        return UsuarioResponse.de(usuarioRepository.save(usuario));
    }

    @Transactional
    public UsuarioResponse actualizar(Long id, UsuarioRequest datos, String emailActual) {
        Usuario existente = buscar(id);
        String email = datos.email().trim().toLowerCase();
        String run = Validaciones.normalizarRun(datos.run());
        boolean esUnoMismo = existente.getEmail().equalsIgnoreCase(emailActual);
        boolean cambiaEmail = !existente.getEmail().equalsIgnoreCase(email);
        if (cambiaEmail && usuarioRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado");
        }
        if (!existente.getRun().equals(run) && usuarioRepository.existsByRun(run)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este RUN ya está registrado");
        }
        if (esUnoMismo && cambiaEmail) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No puedes cambiar tu propio correo mientras tienes la sesión iniciada");
        }
        if (esUnoMismo && datos.rol() != Rol.ADMIN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No puedes quitarte el rol de administrador a ti mismo");
        }
        copiar(datos, existente);
        existente.setRun(run);
        existente.setEmail(email);
        existente.setRol(datos.rol());
        if (datos.password() != null && !datos.password().isBlank()) {
            validarPassword(datos.password());
            existente.setPassword(passwordEncoder.encode(datos.password()));
        }
        return UsuarioResponse.de(usuarioRepository.save(existente));
    }

    @Transactional
    public void eliminar(Long id, String emailActual) {
        Usuario usuario = buscar(id);
        if (usuario.getEmail().equalsIgnoreCase(emailActual)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No puedes eliminar tu propia cuenta");
        }
        boletaRepository.findByUsuario_IdOrderByFechaDesc(id).forEach(boleta -> boleta.setUsuario(null));
        usuarioRepository.delete(usuario);
    }

    private void copiar(UsuarioRequest datos, Usuario usuario) {
        usuario.setNombre(datos.nombre().trim());
        usuario.setApellidos(datos.apellidos().trim());
        usuario.setFechaNacimiento(datos.fechaNacimiento());
        usuario.setTelefono(datos.telefono());
        usuario.setRegion(datos.region());
        usuario.setComuna(datos.comuna());
        usuario.setDireccion(datos.direccion().trim());
    }

    private void validarPassword(String password) {
        if (!Validaciones.passwordSegura(password)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Validaciones.MENSAJE_PASSWORD);
        }
    }

    private Usuario buscar(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }
}
