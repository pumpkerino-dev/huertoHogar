package com.huertohogar.backend.dto;

import com.huertohogar.backend.model.Usuario;

/** Respuesta del login: el token JWT + los datos del usuario (sin contraseña). */
public record LoginResponse(String token, Usuario usuario) {
}
