package com.soltel.elex.services;

import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.repositories.IActuacionesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActuacionesService {

	@Autowired
    private IActuacionesRepository repository;

    public List<ActuacionesModel> consultarActuaciones() {
        return repository.findAll();
    }

    public ActuacionesModel insertarActuaciones(ActuacionesModel tipo) {
        return repository.save(tipo);
    }

    public ActuacionesModel actualizarActuaciones(ActuacionesModel tipo) {
        return repository.save(tipo);
    }

    public void borrarActuaciones(int id) {
        repository.deleteById(id);
    }

    public Optional<ActuacionesModel> obtenerActuacionesPorId(int id) {
        return repository.findById(id);
    }

}