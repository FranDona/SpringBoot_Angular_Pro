package com.soltel.elex.services;

import java.util.List;

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.repositories.IExpedientesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpedientesService {

    private final IExpedientesRepository expedientesRepository;
    
    @Autowired
    public ExpedientesService(IExpedientesRepository expedientesRepository) {
        this.expedientesRepository = expedientesRepository;
    }

    public List<ExpedientesModel> findAllExpedientes() {
        return expedientesRepository.findAll();
    }

    public ExpedientesModel saveExpediente(ExpedientesModel expediente) {
        return expedientesRepository.save(expediente);
    }
}
