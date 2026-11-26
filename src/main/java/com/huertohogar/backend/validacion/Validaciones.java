package com.huertohogar.backend.validacion;

import java.util.List;
import java.util.Locale;

public final class Validaciones {

    public static final List<String> DOMINIOS_PERMITIDOS = List.of("duoc.cl", "profesor.duoc.cl", "gmail.com");

    public static final String REGEX_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,10}$";

    public static final String MENSAJE_PASSWORD =
            "La contraseña debe tener entre 8 y 10 caracteres, una mayúscula, una minúscula y un número";

    private Validaciones() {
    }

    public static String normalizarRun(String run) {
        return run == null ? "" : run.replace(".", "").replace("-", "").trim().toUpperCase(Locale.ROOT);
    }

    public static boolean runValido(String run) {
        String limpio = normalizarRun(run);
        if (!limpio.matches("^\\d{6,8}[0-9K]$")) {
            return false;
        }
        String cuerpo = limpio.substring(0, limpio.length() - 1);
        char dv = limpio.charAt(limpio.length() - 1);
        return calcularDv(cuerpo) == dv;
    }

    public static char calcularDv(String cuerpo) {
        int suma = 0;
        int multiplicador = 2;
        for (int i = cuerpo.length() - 1; i >= 0; i--) {
            suma += Character.getNumericValue(cuerpo.charAt(i)) * multiplicador;
            multiplicador = multiplicador == 7 ? 2 : multiplicador + 1;
        }
        int resto = 11 - (suma % 11);
        if (resto == 11) {
            return '0';
        }
        if (resto == 10) {
            return 'K';
        }
        return (char) ('0' + resto);
    }

    public static boolean correoPermitido(String correo) {
        if (correo == null) {
            return false;
        }
        String limpio = correo.trim().toLowerCase(Locale.ROOT);
        int arroba = limpio.lastIndexOf('@');
        if (arroba <= 0 || arroba == limpio.length() - 1) {
            return false;
        }
        return DOMINIOS_PERMITIDOS.contains(limpio.substring(arroba + 1));
    }

    public static boolean passwordSegura(String password) {
        return password != null && password.matches(REGEX_PASSWORD);
    }
}
