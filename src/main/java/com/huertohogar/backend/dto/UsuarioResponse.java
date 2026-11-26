package com.huertohogar.backend.dto;

import java.time.LocalDate;

import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.model.Usuario;

public record UsuarioResponse(
        Long id,
        String run,
        String nombre,
        String apellidos,
        String email,
        LocalDate fechaNacimiento,
        String telefono,
        String region,
        String comuna,
        String direccion,
        Rol rol) {

    public static UsuarioResponse de(Usuario u) {
        return new UsuarioResponse(u.getId(), u.getRun(), u.getNombre(), u.getApellidos(), u.getEmail(),
                u.getFechaNacimiento(), u.getTelefono(), u.getRegion(), u.getComuna(), u.getDireccion(), u.getRol());
    }
}
