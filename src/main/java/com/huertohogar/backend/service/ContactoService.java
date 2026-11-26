package com.huertohogar.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.huertohogar.backend.dto.ContactoRequest;
import com.huertohogar.backend.dto.ContactoResponse;
import com.huertohogar.backend.model.MensajeContacto;
import com.huertohogar.backend.repository.MensajeContactoRepository;

@Service
public class ContactoService {

    private final MensajeContactoRepository mensajeRepository;

    public ContactoService(MensajeContactoRepository mensajeRepository) {
        this.mensajeRepository = mensajeRepository;
    }

    @Transactional
    public ContactoResponse crear(ContactoRequest datos) {
        MensajeContacto mensaje = new MensajeContacto();
        mensaje.setNombre(datos.nombre().trim());
        mensaje.setCorreo(datos.correo() == null || datos.correo().isBlank() ? null : datos.correo().trim());
        mensaje.setComentario(datos.comentario().trim());
        mensaje.setFecha(LocalDateTime.now());
        return ContactoResponse.de(mensajeRepository.save(mensaje));
    }

    @Transactional(readOnly = true)
    public List<ContactoResponse> listar() {
        return mensajeRepository.findAllByOrderByFechaDesc().stream().map(ContactoResponse::de).toList();
    }
}
