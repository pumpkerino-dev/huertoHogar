package com.huertohogar.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.huertohogar.backend.dto.AuthResponse;
import com.huertohogar.backend.dto.LoginRequest;
import com.huertohogar.backend.dto.PerfilRequest;
import com.huertohogar.backend.dto.RecuperarRequest;
import com.huertohogar.backend.dto.RecuperarResponse;
import com.huertohogar.backend.dto.RefreshRequest;
import com.huertohogar.backend.dto.RegistroRequest;
import com.huertohogar.backend.dto.RestablecerRequest;
import com.huertohogar.backend.dto.UsuarioResponse;
import com.huertohogar.backend.dto.VerificarCodigoRequest;
import com.huertohogar.backend.service.AuthService;
import com.huertohogar.backend.service.RecuperacionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Autenticación", description = "Login, registro, renovación del token, recuperación de contraseña y perfil propio")
public class AuthController {

    private final AuthService authService;
    private final RecuperacionService recuperacionService;

    public AuthController(AuthService authService, RecuperacionService recuperacionService) {
        this.authService = authService;
        this.recuperacionService = recuperacionService;
    }

    @PostMapping("/login")
    @SecurityRequirements
    @Operation(summary = "Iniciar sesión", description = "Devuelve el token de acceso, el token de refresco y el usuario.")
    @ApiResponse(responseCode = "200", description = "Login correcto")
    @ApiResponse(responseCode = "401", description = "Correo o contraseña incorrectos")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/registro")
    @SecurityRequirements
    @Operation(summary = "Crear cuenta", description = "Registra un usuario con rol CLIENTE y devuelve sus tokens.")
    @ApiResponse(responseCode = "201", description = "Cuenta creada")
    @ApiResponse(responseCode = "409", description = "Correo o RUN ya registrado")
    public ResponseEntity<AuthResponse> registro(@Valid @RequestBody RegistroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrar(request));
    }

    @PostMapping("/refresh")
    @SecurityRequirements
    @Operation(summary = "Renovar el token",
               description = "Recibe el token de refresco y entrega un token de acceso nuevo y un refresco nuevo.")
    @ApiResponse(responseCode = "200", description = "Tokens renovados")
    @ApiResponse(responseCode = "401", description = "Token de refresco inválido o expirado")
    public AuthResponse refrescar(@Valid @RequestBody RefreshRequest request) {
        return authService.refrescar(request.refreshToken());
    }

    @PostMapping("/recuperar")
    @SecurityRequirements
    @Operation(summary = "Pedir código para recuperar la contraseña",
               description = "Genera un código de 6 dígitos válido por 10 minutos. Como no hay servidor de correo, "
                       + "el código se devuelve en codigoDemo y se escribe en el log del backend.")
    @ApiResponse(responseCode = "200", description = "Código generado")
    public RecuperarResponse recuperar(@Valid @RequestBody RecuperarRequest request) {
        return recuperacionService.solicitar(request.email());
    }

    @PostMapping("/recuperar/verificar")
    @SecurityRequirements
    @Operation(summary = "Verificar el código de recuperación")
    @ApiResponse(responseCode = "204", description = "Código correcto")
    @ApiResponse(responseCode = "400", description = "Código incorrecto o vencido")
    public ResponseEntity<Void> verificar(@Valid @RequestBody VerificarCodigoRequest request) {
        recuperacionService.verificar(request.email(), request.codigo());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/restablecer")
    @SecurityRequirements
    @Operation(summary = "Guardar la nueva contraseña", description = "Requiere el código vigente; después el código deja de servir.")
    @ApiResponse(responseCode = "204", description = "Contraseña actualizada")
    @ApiResponse(responseCode = "400", description = "Código incorrecto o vencido, o contraseña que no cumple las reglas")
    public ResponseEntity<Void> restablecer(@Valid @RequestBody RestablecerRequest request) {
        recuperacionService.restablecer(request.email(), request.codigo(), request.password());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    @Operation(summary = "Usuario actual", description = "Devuelve el usuario dueño del token.")
    @ApiResponse(responseCode = "401", description = "Token ausente, inválido o expirado")
    public UsuarioResponse me(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        return authService.usuarioActual(actual.getUsername());
    }

    @PutMapping("/me")
    @Operation(summary = "Actualizar mi perfil", description = "No permite cambiar el correo ni el rol.")
    public UsuarioResponse actualizarPerfil(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual,
                                            @Valid @RequestBody PerfilRequest datos) {
        return authService.actualizarPerfil(actual.getUsername(), datos);
    }
}
