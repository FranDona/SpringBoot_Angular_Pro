package com.soltel.elex.services;

import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.repositories.IActuacionesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActuacionesService {

    private final IActuacionesRepository actuacionesRepository;
    
    // Constructor para cargar el repositorio que yo he hecho
    // Inyecto la dependencia
    @Autowired
    public ActuacionesService(IActuacionesRepository actuacionesRepository) {
        this.actuacionesRepository = actuacionesRepository;
    }

    // Creo mis propios métodos para hacer consultas
    // findAll -> SELECT * FROM Clientes
    // OJO! Este nombre es por convención: findAllClientes
    public List<ActuacionesModel> findAllActuaciones() {
        return actuacionesRepository.findAll();
    }

}
