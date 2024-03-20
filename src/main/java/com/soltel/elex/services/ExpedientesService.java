package com.soltel.elex.services;

import java.util.List;

import com.soltel.elex.models.ExpedientesModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soltel.elex.repositories.IExpedientesRepository;

@Service
public class ExpedientesService {

    private final IExpedientesRepository expedientesRepository;
    
    // Constructor para cargar el repositorio que yo he hecho
    // Inyecto la dependencia
    @Autowired
    public ExpedientesService(IExpedientesRepository expedientesRepository) {
        this.expedientesRepository = expedientesRepository;
    }

    // Creo mis propios métodos para hacer consultas
    // findAll -> SELECT * FROM Clientes
    // OJO! Este nombre es por convención: findAllClientes
    public List<ExpedientesModel> findAllExpedientes() {
        return expedientesRepository.findAll();
    }

}
