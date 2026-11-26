package com.huertohogar.backend.dto;

public record AuthResponse(String token, String refreshToken, UsuarioResponse usuario) {
}
