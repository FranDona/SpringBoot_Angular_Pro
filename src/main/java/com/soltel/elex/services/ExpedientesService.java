package com.soltel.elex.services;

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.repositories.IExpedientesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ExpedientesService {

	@Autowired
    private IExpedientesRepository repository;

    public List<ExpedientesModel> consultarExpeidentes() {
        return repository.findAll();
    }

    public ExpedientesModel insertarExpedientes(ExpedientesModel tipo) {
        return repository.save(tipo);
    }

    public ExpedientesModel actualizarExpediente(ExpedientesModel tipo) {
        return repository.save(tipo);
    }

    public void borrarExpedeintes(int id) {
        repository.deleteById(id);
    }

    public Optional<ExpedientesModel> obtenerExpedientesPorId(int id) {
        return repository.findById(id);
    }
}
