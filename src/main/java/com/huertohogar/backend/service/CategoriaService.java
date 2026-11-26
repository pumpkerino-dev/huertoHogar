package com.huertohogar.backend.service;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.huertohogar.backend.dto.CategoriaRequest;
import com.huertohogar.backend.dto.CategoriaResponse;
import com.huertohogar.backend.model.Categoria;
import com.huertohogar.backend.repository.CategoriaRepository;
import com.huertohogar.backend.repository.ProductoRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream().map(this::respuesta).toList();
    }

    @Transactional(readOnly = true)
    public CategoriaResponse obtener(String id) {
        return respuesta(buscar(id));
    }

    @Transactional
    public CategoriaResponse crear(CategoriaRequest datos) {
        String nombre = datos.nombre().trim();
        String id = generarId(nombre);
        if (id.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de la categoría no es válido");
        }
        if (categoriaRepository.existsById(id) || categoriaRepository.existsByNombreIgnoreCase(nombre)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una categoría con ese nombre");
        }
        Categoria categoria = new Categoria(id, nombre, limpiar(datos.descripcion()));
        return respuesta(categoriaRepository.save(categoria));
    }

    @Transactional
    public CategoriaResponse actualizar(String id, CategoriaRequest datos) {
        Categoria categoria = buscar(id);
        String nombre = datos.nombre().trim();
        if (categoriaRepository.existsByNombreIgnoreCaseAndIdNot(nombre, id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una categoría con ese nombre");
        }
        categoria.setNombre(nombre);
        categoria.setDescripcion(limpiar(datos.descripcion()));
        return respuesta(categoriaRepository.save(categoria));
    }

    @Transactional
    public void eliminar(String id) {
        Categoria categoria = buscar(id);
        long productos = productoRepository.countByCategoria_Id(id);
        if (productos > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar: la categoría tiene " + productos + " producto(s)");
        }
        categoriaRepository.delete(categoria);
    }

    public Categoria buscar(String id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));
    }

    static String generarId(String nombre) {
        String sinTildes = Normalizer.normalize(nombre, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        return sinTildes.toLowerCase(Locale.ROOT).trim().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }

    private CategoriaResponse respuesta(Categoria c) {
        return new CategoriaResponse(c.getId(), c.getNombre(), c.getDescripcion(),
                productoRepository.countByCategoria_Id(c.getId()));
    }

    private static String limpiar(String texto) {
        return texto == null ? "" : texto.trim();
    }
}
