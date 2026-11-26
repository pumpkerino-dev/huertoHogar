package com.huertohogar.backend.service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.RecuperarResponse;
import com.huertohogar.backend.model.Usuario;
import com.huertohogar.backend.repository.UsuarioRepository;

@Service
public class RecuperacionService {

    static final String MENSAJE_ENVIADO = "Si el correo está registrado, te enviamos un código de 6 dígitos";
    static final String CODIGO_INVALIDO = "El código es incorrecto o ya venció. Pide uno nuevo";
    private static final int MINUTOS_VIGENCIA = 10;
    private static final int MAX_INTENTOS = 5;
    private static final Logger log = LoggerFactory.getLogger(RecuperacionService.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom random = new SecureRandom();
    private final Map<String, Solicitud> solicitudes = new ConcurrentHashMap<>();

    private static final class Solicitud {
        private final String codigo;
        private final Instant vence;
        private int intentos;

        private Solicitud(String codigo, Instant vence) {
            this.codigo = codigo;
            this.vence = vence;
        }
    }

    public RecuperacionService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RecuperarResponse solicitar(String email) {
        String correo = email.trim().toLowerCase();
        String codigo = String.format("%06d", random.nextInt(1_000_000));
        if (usuarioRepository.existsByEmailIgnoreCase(correo)) {
            solicitudes.put(correo, new Solicitud(codigo, Instant.now().plus(MINUTOS_VIGENCIA, ChronoUnit.MINUTES)));
            log.info("Código de recuperación para {}: {}", correo, codigo);
        }
        return new RecuperarResponse(MENSAJE_ENVIADO, codigo);
    }

    public void verificar(String email, String codigo) {
        validarCodigo(email.trim().toLowerCase(), codigo);
    }

    @Transactional
    public void restablecer(String email, String codigo, String password) {
        String correo = email.trim().toLowerCase();
        validarCodigo(correo, codigo);
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(correo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, CODIGO_INVALIDO));
        usuario.setPassword(passwordEncoder.encode(password));
        usuarioRepository.save(usuario);
        solicitudes.remove(correo);
    }

    private void validarCodigo(String correo, String codigo) {
        Solicitud solicitud = solicitudes.get(correo);
        if (solicitud == null || Instant.now().isAfter(solicitud.vence) || solicitud.intentos >= MAX_INTENTOS) {
            solicitudes.remove(correo);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, CODIGO_INVALIDO);
        }
        if (!solicitud.codigo.equals(codigo)) {
            solicitud.intentos++;
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, CODIGO_INVALIDO);
        }
    }
}
