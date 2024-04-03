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

    // Nuevo método para actualizar lógicamente el campo borrado a true para documentos
    public DocumentosModel borrarLogicoDocumentos(int id) {
        Optional<DocumentosModel> documentoOptional = repository.findById(id);
        if (documentoOptional.isPresent()) {
            DocumentosModel documento = documentoOptional.get();
            documento.setBorrado(true); // Actualiza el campo borrado a true
            return repository.save(documento); // Guarda el documento actualizado en la base de datos
        } else {
            return null; // Manejar el caso si el documento no se encuentra
        }
    }

    public DocumentosModel recuperarDocumentos(int id) {
        Optional<DocumentosModel> documentoOptional = repository.findById(id);
        if (documentoOptional.isPresent()) {
            DocumentosModel documento = documentoOptional.get();
            // Verificar si el documento ya está recuperado (borrado = false)
            if (!documento.isBorrado()) {
                return null; // Manejar el caso si el documento ya está recuperado
            }
            documento.setBorrado(false); // Actualiza el campo borrado a false
            return repository.save(documento); // Guarda el documento actualizado en la base de datos
        } else {
            return null; // Manejar el caso si el documento no se encuentra
        }
    }


    public boolean existeDocumentoEnExpediente(int id) {
        return repository.existsById(id);
    }
    
}
