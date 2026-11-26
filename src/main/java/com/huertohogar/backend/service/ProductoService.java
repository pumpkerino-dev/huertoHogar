package com.huertohogar.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.ProductoRequest;
import com.huertohogar.backend.dto.ProductoResponse;
import com.huertohogar.backend.model.Producto;
import com.huertohogar.backend.repository.DetalleBoletaRepository;
import com.huertohogar.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final DetalleBoletaRepository detalleBoletaRepository;
    private final CategoriaService categoriaService;

    public ProductoService(ProductoRepository productoRepository, DetalleBoletaRepository detalleBoletaRepository,
                           CategoriaService categoriaService) {
        this.productoRepository = productoRepository;
        this.detalleBoletaRepository = detalleBoletaRepository;
        this.categoriaService = categoriaService;
    }

    @Transactional(readOnly = true)
    public List<ProductoResponse> listar(String categoria) {
        List<Producto> productos = categoria == null || categoria.isBlank()
                ? productoRepository.findAll()
                : productoRepository.findByCategoria_Id(categoria);
        return productos.stream().map(ProductoResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public List<ProductoResponse> criticos() {
        return productoRepository.findAll().stream()
                .filter(Producto::esCritico)
                .map(ProductoResponse::de)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductoResponse obtener(Long id) {
        return ProductoResponse.de(buscar(id));
    }

    @Transactional(readOnly = true)
    public ProductoResponse obtenerPorCodigo(String codigo) {
        return ProductoResponse.de(productoRepository.findByCodigoIgnoreCase(codigo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado")));
    }

    @Transactional
    public ProductoResponse crear(ProductoRequest datos) {
        String codigo = datos.codigo().trim().toUpperCase();
        if (productoRepository.existsByCodigoIgnoreCase(codigo)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un producto con ese código");
        }
        validarOferta(datos);
        Producto producto = new Producto();
        copiar(datos, producto);
        producto.setCodigo(codigo);
        return ProductoResponse.de(productoRepository.save(producto));
    }

    @Transactional
    public ProductoResponse actualizar(Long id, ProductoRequest datos) {
        Producto existente = buscar(id);
        String codigo = datos.codigo().trim().toUpperCase();
        if (!existente.getCodigo().equalsIgnoreCase(codigo) && productoRepository.existsByCodigoIgnoreCase(codigo)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un producto con ese código");
        }
        validarOferta(datos);
        copiar(datos, existente);
        existente.setCodigo(codigo);
        return ProductoResponse.de(productoRepository.save(existente));
    }

    @Transactional
    public void eliminar(Long id) {
        Producto producto = buscar(id);
        if (detalleBoletaRepository.existsByProducto_Id(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar: el producto aparece en boletas. Puedes dejar su stock en 0");
        }
        productoRepository.delete(producto);
    }

    public Producto buscar(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    private void copiar(ProductoRequest datos, Producto producto) {
        producto.setNombre(datos.nombre().trim());
        producto.setDescripcion(datos.descripcion());
        producto.setCategoria(categoriaService.buscar(datos.categoria()));
        producto.setPrecio(datos.precio());
        producto.setPrecioOriginal(datos.precioOriginal());
        producto.setUnidad(datos.unidad());
        producto.setStock(datos.stock());
        producto.setStockCritico(datos.stockCritico());
        producto.setOrigen(datos.origen());
        producto.setImagen(datos.imagen());
        if (datos.descripcionCorta() != null) {
            producto.setDescripcionCorta(datos.descripcionCorta());
        }
        if (datos.estrellas() != null) {
            producto.setEstrellas(datos.estrellas());
        }
        if (datos.origenFiltro() != null) {
            producto.setOrigenFiltro(datos.origenFiltro());
        }
        if (datos.certificacion() != null) {
            producto.setCertificacion(datos.certificacion());
        }
        if (datos.detalle() != null) {
            producto.setDetalle(datos.detalle());
        }
    }

    private void validarOferta(ProductoRequest datos) {
        if (datos.precioOriginal() != null && datos.precioOriginal() <= datos.precio()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "El precio original debe ser mayor que el precio de oferta");
        }
    }
}
