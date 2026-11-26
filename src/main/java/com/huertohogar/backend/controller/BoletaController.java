package com.huertohogar.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.huertohogar.backend.dto.BoletaRequest;
import com.huertohogar.backend.dto.BoletaResponse;
import com.huertohogar.backend.dto.EstadoRequest;
import com.huertohogar.backend.service.BoletaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/boletas")
@Tag(name = "Boletas", description = "Compras del checkout, boletas y seguimiento del pedido")
public class BoletaController {

    private final BoletaService boletaService;

    public BoletaController(BoletaService boletaService) {
        this.boletaService = boletaService;
    }

    @PostMapping
    @Operation(summary = "Confirmar una compra",
               description = "Valida stock con la BD, calcula el total con los precios de la BD, descuenta el stock "
                       + "y guarda la boleta con su detalle. simularFallo=true simula un pago rechazado.")
    @ApiResponse(responseCode = "201", description = "Compra exitosa")
    @ApiResponse(responseCode = "400", description = "Carrito o datos de envío inválidos")
    @ApiResponse(responseCode = "402", description = "Pago rechazado (simulado)")
    public ResponseEntity<BoletaResponse> crear(@Valid @RequestBody BoletaRequest pedido,
                                                @Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        String email = actual == null ? null : actual.getUsername();
        return ResponseEntity.status(HttpStatus.CREATED).body(boletaService.crear(pedido, email));
    }

    @GetMapping
    @Operation(summary = "Listar todas las boletas (ADMIN o VENDEDOR)")
    public List<BoletaResponse> listar() {
        return boletaService.listar();
    }

    @GetMapping("/mias")
    @Operation(summary = "Boletas del usuario logueado", description = "Para Mi Cuenta y el seguimiento del pedido.")
    public List<BoletaResponse> mias(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        return boletaService.mias(actual.getUsername());
    }

    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Historial de compras de un usuario (ADMIN)")
    public List<BoletaResponse> deUsuario(@PathVariable Long usuarioId) {
        return boletaService.deUsuario(usuarioId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalle de una boleta", description = "ADMIN y VENDEDOR ven todas; un CLIENTE solo las suyas.")
    @ApiResponse(responseCode = "403", description = "La boleta no es del usuario")
    public BoletaResponse obtener(@PathVariable Long id,
                                  @Parameter(hidden = true) @AuthenticationPrincipal UserDetails actual) {
        return boletaService.obtener(id, actual.getUsername());
    }

    @PatchMapping("/{id}/estado")
    @Operation(summary = "Cambiar el estado del pedido (ADMIN)",
               description = "EN_PREPARACION → EN_CAMINO → ENTREGADO. CANCELADA devuelve el stock.")
    public BoletaResponse cambiarEstado(@PathVariable Long id, @Valid @RequestBody EstadoRequest datos) {
        return boletaService.cambiarEstado(id, datos.estado());
    }
}
