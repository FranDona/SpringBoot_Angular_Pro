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

    // Nuevo método para actualizar lógicamente el campo borrado a true
    public ExpedientesModel borrarLogicoExpedientes(int id) {
        Optional<ExpedientesModel> expedienteOptional = repository.findById(id);
        if (expedienteOptional.isPresent()) {
            ExpedientesModel expediente = expedienteOptional.get();
            expediente.setBorrado(true); // Actualiza el campo borrado a true
            return repository.save(expediente); // Guarda el expediente actualizado en la base de datos
        } else {
            return null; // Manejar el caso si el expediente no se encuentra
        }
    }

    public ExpedientesModel recuperarExpedientes(int id) {
        Optional<ExpedientesModel> expedienteOptional = repository.findById(id);
        if (expedienteOptional.isPresent()) {
            ExpedientesModel expediente = expedienteOptional.get();
            // Verificar si el expediente ya está recuperado (borrado = false)
            if (!expediente.isBorrado()) {
                return null; // Manejar el caso si el expediente ya está recuperado
            }
            // Establecer el atributo 'borrado' en false para indicar que el expediente ha sido recuperado
            expediente.setBorrado(false);
            // Guardar el expediente actualizado en la base de datos
            return repository.save(expediente);
        } else {
            return null; // Manejar el caso si el expediente no se encuentra
        }
    }

    public boolean existeExpedientePorCodigo(String codigo) {
        return repository.existsByCodigo(codigo);
    }


}
