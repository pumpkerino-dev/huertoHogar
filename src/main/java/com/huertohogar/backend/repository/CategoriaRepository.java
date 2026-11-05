package com.huertohogar.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.huertohogar.backend.model.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, String> {

    boolean existsByNombreIgnoreCase(String nombre);

    boolean existsByNombreIgnoreCaseAndIdNot(String nombre, String id);
}
