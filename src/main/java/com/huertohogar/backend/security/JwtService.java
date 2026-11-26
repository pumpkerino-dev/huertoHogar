package com.huertohogar.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    public static final String TIPO_ACCESO = "access";
    public static final String TIPO_REFRESCO = "refresh";
    private static final String CLAIM_TIPO = "tipo";
    private static final String CLAIM_ROL = "rol";

    private final SecretKey secretKey;
    private final long duracionAcceso;
    private final long duracionRefresco;

    public JwtService(@Value("${app.jwt.secret}") String secretoBase64,
                      @Value("${app.jwt.expiration-ms}") long duracionAcceso,
                      @Value("${app.jwt.refresh-expiration-ms}") long duracionRefresco) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretoBase64));
        this.duracionAcceso = duracionAcceso;
        this.duracionRefresco = duracionRefresco;
    }

    public String generarTokenAcceso(String email, String rol) {
        return construir(email, TIPO_ACCESO, rol, duracionAcceso);
    }

    public String generarTokenRefresco(String email) {
        return construir(email, TIPO_REFRESCO, null, duracionRefresco);
    }

    public String extraerEmail(String token) {
        return leer(token).getSubject();
    }

    public boolean esTokenAcceso(String token) {
        return TIPO_ACCESO.equals(leer(token).get(CLAIM_TIPO, String.class));
    }

    public String validarTokenRefresco(String token) {
        Claims claims = leer(token);
        if (!TIPO_REFRESCO.equals(claims.get(CLAIM_TIPO, String.class))) {
            throw new JwtException("El token no es de refresco");
        }
        return claims.getSubject();
    }

    public long getDuracionAcceso() {
        return duracionAcceso;
    }

    private String construir(String email, String tipo, String rol, long duracion) {
        Date ahora = new Date();
        var builder = Jwts.builder()
                .subject(email)
                .claim(CLAIM_TIPO, tipo)
                .issuedAt(ahora)
                .expiration(new Date(ahora.getTime() + duracion));
        if (rol != null) {
            builder.claim(CLAIM_ROL, rol);
        }
        return builder.signWith(secretKey).compact();
    }

    private Claims leer(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
