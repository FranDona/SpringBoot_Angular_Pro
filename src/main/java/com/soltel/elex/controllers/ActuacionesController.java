package com.soltel.elex.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.services.ActuacionesService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



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
