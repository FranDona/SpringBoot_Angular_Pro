package com.soltel.elex.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.services.ActuacionesService;




@RestController
@RequestMapping("/actuaciones")
public class ActuacionesController {

    // Atributo principal
    private final ActuacionesService actuacionesService;

    // Constructor
    public ActuacionesController (ActuacionesService actuacionesService) {
        this.actuacionesService = actuacionesService;
    }

    // Método de consulta general
    // endpoint de ejemplo: http://localhost:8101/actuaciones/consultar
    @GetMapping("/consultar")
    public ResponseEntity<List<ActuacionesModel>> getAllActuaciones(){
        return ResponseEntity.ok(actuacionesService.findAllActuaciones());
    }

}
