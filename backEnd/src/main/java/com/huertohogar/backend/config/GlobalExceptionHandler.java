package com.huertohogar.backend.config;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

/**
 * Convierte los errores en respuestas JSON uniformes: { "mensaje": "...", "errores": {...} }
 * para que el frontend pueda mostrarlos al usuario.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /** Errores de @Valid (campos obligatorios, formato de correo, precio negativo, etc.) */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> validacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> errores.putIfAbsent(e.getField(), e.getDefaultMessage()));

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("mensaje", errores.values().stream().findFirst().orElse("Datos inválidos"));
        body.put("errores", errores);
        return ResponseEntity.badRequest().body(body);
    }

    /** Errores lanzados a propósito desde los controllers (404, 409, 401...) */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> estado(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(Map.of("mensaje", ex.getReason() != null ? ex.getReason() : "Error"));
    }

    /** Ej: código de producto o correo duplicado que se escapó de la validación. */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> integridad(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("mensaje", "El registro entra en conflicto con uno existente (dato duplicado)"));
    }
}
