package com.soltel.elex.services;

import java.util.List;

import com.soltel.elex.models.DocumentosModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soltel.elex.repositories.IDocumentosRepository;

@Service
public class DocumentosService {

    private final IDocumentosRepository documentosRepository;
    
    // Constructor para cargar el repositorio que yo he hecho
    // Inyecto la dependencia
    @Autowired
    public DocumentosService(IDocumentosRepository documentosRepository) {
        this.documentosRepository = documentosRepository;
    }

    // Creo mis propios métodos para hacer consultas
    // findAll -> SELECT * FROM Documentos
    // OJO! Este nombre es por convención: findAllDocumentos
    public List<DocumentosModel> findAllDocumentos() {
        return documentosRepository.findAll();
    }
}
