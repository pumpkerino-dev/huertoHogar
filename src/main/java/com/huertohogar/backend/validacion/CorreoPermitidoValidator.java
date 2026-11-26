package com.huertohogar.backend.validacion;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CorreoPermitidoValidator implements ConstraintValidator<CorreoPermitido, String> {

    @Override
    public boolean isValid(String valor, ConstraintValidatorContext context) {
        return valor == null || valor.isBlank() || Validaciones.correoPermitido(valor);
    }
}
