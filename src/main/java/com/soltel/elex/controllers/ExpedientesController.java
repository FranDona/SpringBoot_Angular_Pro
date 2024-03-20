package com.soltel.elex.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.services.ExpedientesService;

@RestController
@RequestMapping("/expedientes")
public class ExpedientesController {

    // Atributo principal
    private final ExpedientesService expedientesService;

    // Constructor
    public ExpedientesController (ExpedientesService expedientesService) {
        this.expedientesService = expedientesService;
    }

    // Método de consulta general
    // endpoint de ejemplo: http://localhost:8101/expedientes/consultar
    @GetMapping("/consultar")
    public ResponseEntity<List<ExpedientesModel>> getAllExpedientes(){
        return ResponseEntity.ok(expedientesService.findAllExpedientes());
    }

}
