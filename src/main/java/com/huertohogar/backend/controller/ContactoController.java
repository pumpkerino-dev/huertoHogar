package com.huertohogar.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.huertohogar.backend.dto.ContactoRequest;
import com.huertohogar.backend.dto.ContactoResponse;
import com.huertohogar.backend.service.ContactoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/contacto")
@Tag(name = "Contacto", description = "Mensajes del formulario de contacto")
public class ContactoController {

    private final ContactoService contactoService;

    public ContactoController(ContactoService contactoService) {
        this.contactoService = contactoService;
    }

    @PostMapping
    @SecurityRequirements
    @Operation(summary = "Enviar un mensaje de contacto (público)")
    public ResponseEntity<ContactoResponse> crear(@Valid @RequestBody ContactoRequest datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactoService.crear(datos));
    }

    @GetMapping
    @Operation(summary = "Listar mensajes de contacto (ADMIN)")
    public List<ContactoResponse> listar() {
        return contactoService.listar();
    }
}
