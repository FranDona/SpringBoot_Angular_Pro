package com.soltel.elex.services;

import java.util.List;
import java.util.Optional;

import com.soltel.elex.models.DocumentosModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soltel.elex.repositories.IDocumentosRepository;

@Service
public class DocumentosService {

@Autowired
    private IDocumentosRepository repository;

    public List<DocumentosModel> consultarDocumentos() {
        return repository.findAll();
    }

    public DocumentosModel insertarDocumentos(DocumentosModel tipo) {
        return repository.save(tipo);
    }

    public DocumentosModel actualizarDocumentos(DocumentosModel tipo) {
        return repository.save(tipo);
    }

    public void borrarDocumentos(int id) {
        repository.deleteById(id);
    }

    public Optional<DocumentosModel> obtenerDocumentosPorId(int id) {
        return repository.findById(id);
    }
}
