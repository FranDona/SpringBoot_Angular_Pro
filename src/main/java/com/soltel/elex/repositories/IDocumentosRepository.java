package com.soltel.elex.repositories;

import com.soltel.elex.models.DocumentosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDocumentosRepository extends JpaRepository<DocumentosModel, Integer> {
    boolean existsById(int id);
}
