package com.huertohogar.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * Documentación Swagger: http://localhost:8089/swagger-ui.html
 *
 * Para probar rutas de ADMIN desde Swagger:
 *  1. Ejecutar POST /api/v1/auth/login con el admin y copiar el "token".
 *  2. Botón "Authorize" (candado) -> pegar el token -> Authorize.
 */
@Configuration
public class OpenApiConfig {

    private static final String ESQUEMA = "bearerAuth";

    @Bean
    public OpenAPI huertoHogarOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API HuertoHogar")
                        .version("v1")
                        .description("API REST de la tienda HuertoHogar: autenticación JWT, "
                                + "productos y usuarios con roles CLIENTE / ADMIN."))
                .components(new Components().addSecuritySchemes(ESQUEMA,
                        new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList(ESQUEMA));
    }
}
