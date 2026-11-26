package com.huertohogar.backend.dto;

import java.time.LocalDateTime;

import com.huertohogar.backend.model.MensajeContacto;

public record ContactoResponse(Long id, String nombre, String correo, String comentario, LocalDateTime fecha) {

    public static ContactoResponse de(MensajeContacto m) {
        return new ContactoResponse(m.getId(), m.getNombre(), m.getCorreo(), m.getComentario(), m.getFecha());
    }
}
