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

    // Método para actualizar lógicamente el campo borrado a true para actuaciones
    public ActuacionesModel borrarLogicoActuacion(int id) {
        Optional<ActuacionesModel> actuacionOptional = repository.findById(id);
        if (actuacionOptional.isPresent()) {
            ActuacionesModel actuacion = actuacionOptional.get();
            actuacion.setBorrado(true); // Actualiza el campo borrado a true
            return repository.save(actuacion); // Guarda la actuación actualizada en la base de datos
        } else {
            return null; // Manejar el caso si la actuación no se encuentra
        }
    }

    // Método para recuperar lógicamente el campo borrado a false para actuaciones
    public ActuacionesModel recuperarActuacion(int id) {
        Optional<ActuacionesModel> actuacionOptional = repository.findById(id);
        if (actuacionOptional.isPresent()) {
            ActuacionesModel actuacion = actuacionOptional.get();
            // Verificar si la actuación ya está recuperada (borrado = false)
            if (!actuacion.isBorrado()) {
                return null; // Manejar el caso si la actuación ya está recuperada
            }
            actuacion.setBorrado(false); // Actualiza el campo borrado a false
            return repository.save(actuacion); // Guarda la actuación actualizada en la base de datos
        } else {
            return null; // Manejar el caso si la actuación no se encuentra
        }
    }


    public boolean existeActuacion(String descripcion) {
        return repository.existsByDescripcion(descripcion);
    }

}