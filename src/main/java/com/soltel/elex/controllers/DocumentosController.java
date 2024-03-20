package com.soltel.elex.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.DocumentosModel;
import com.soltel.elex.services.DocumentosService;

@RestController
@RequestMapping("/documentos")
public class DocumentosController {

    // Atributo principal
    private final DocumentosService documentosService;

    // Constructor
    public DocumentosController (DocumentosService documentosService) {
        this.documentosService = documentosService;
    }

    // Método de consulta general
    // endpoint de ejemplo: http://localhost:8101/documentos/consultar
    @GetMapping("/consultar")
    public ResponseEntity<List<DocumentosModel>> getAllDocumentos(){
        return ResponseEntity.ok(documentosService.findAllDocumentos());
    }
}
