package com.huertohogar.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.huertohogar.backend.model.Orden;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, String> {

    List<Orden> findAllByOrderByFechaDesc();

    List<Orden> findByClienteEmailIgnoreCaseOrderByFechaDesc(String email);
}
