package com.soltel.elex.repositories;


import com.soltel.elex.models.TiposExpedienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITiposExpedienteRepository extends JpaRepository<TiposExpedienteModel, Integer> {
    boolean existsByMateria(String materia);
}