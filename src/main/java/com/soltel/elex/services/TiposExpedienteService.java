package com.soltel.elex.services;

import com.soltel.elex.models.TiposExpedienteModel;
import com.soltel.elex.repositories.ITiposExpedienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TiposExpedienteService {

    @Autowired
    private ITiposExpedienteRepository repository;

    public List<TiposExpedienteModel> consultarTipos() {
        return repository.findAll();
    }

    public TiposExpedienteModel insertarTipo(TiposExpedienteModel tipo) {
        return repository.save(tipo);
    }

    public TiposExpedienteModel actualizarTipo(TiposExpedienteModel tipo) {
        return repository.save(tipo);
    }

    public void borrarTipo(int id) {
        repository.deleteById(id);
    }

    public Optional<TiposExpedienteModel> obtenerTipoPorId(int id) {
        return repository.findById(id);
    }

    // Nuevo método para actualizar lógicamente el campo borrado a true
    public TiposExpedienteModel borrarLogicoTipo(int id) {
        Optional<TiposExpedienteModel> tipoOptional = repository.findById(id);
        if (tipoOptional.isPresent()) {
            TiposExpedienteModel tipo = tipoOptional.get();
            tipo.setBorrado(true); // Actualiza el campo borrado a true
            return repository.save(tipo); // Guarda el tipo actualizado en la base de datos
        } else {
            return null; // Manejar el caso si el tipo no se encuentra
        }
    }

    public boolean existeMateria(String materia) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'existeMateria'");
    }
}
