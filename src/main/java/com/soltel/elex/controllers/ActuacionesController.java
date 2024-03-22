package com.soltel.elex.controllers;

import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.services.ActuacionesService;
import com.soltel.elex.services.ExpedientesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/actuaciones")
public class ActuacionesController {

    private ActuacionesService actuacionesService;
    private ExpedientesService expedientesService;

    @Autowired
    public ActuacionesController(ActuacionesService actuacionesService, ExpedientesService expedientesService) {
        this.actuacionesService = actuacionesService;
        this.expedientesService = expedientesService;
    }

    @GetMapping("/consultar")
    public List<ActuacionesModel> consultarActuaciones() {
        return actuacionesService.consultarActuaciones();
    }

    @PostMapping("/insertar/{descripcion}/{finalizado}/{fecha}/{expedienteId}")
    public ResponseEntity<ActuacionesModel> insertarActuaciones(@PathVariable String descripcion,
                                                                 @PathVariable boolean finalizado,
                                                                 @PathVariable LocalDate fecha,
                                                                 @PathVariable int expedienteId) {
    
        // Obtener el expediente correspondiente desde el servicio de expedientes
        Optional<ExpedientesModel> expedienteOptional = expedientesService.obtenerExpedientesPorId(expedienteId);
        if (!expedienteOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
    
        ExpedientesModel expediente = expedienteOptional.get();
    
        // Crear una nueva instancia de ActuacionesModel con los datos proporcionados
        ActuacionesModel nuevaActuacion = new ActuacionesModel();
        nuevaActuacion.setDescripcion(descripcion);
        nuevaActuacion.setFinalizado(finalizado);
        nuevaActuacion.setFecha(fecha);
        nuevaActuacion.setExpediente(expediente);
    
        // Insertar la nueva actuación en el servicio
        ActuacionesModel actuacionInsertada = actuacionesService.insertarActuaciones(nuevaActuacion);
    
        // Retornar la respuesta con la nueva actuación insertada y el código de estado 201 CREATED
        return new ResponseEntity<>(actuacionInsertada, HttpStatus.CREATED);
    }
    

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ActuacionesModel> actualizarActuacion(@PathVariable int id, @RequestBody ActuacionesModel actuacionActualizada) {
        // Verificar si la actuación existente está presente en la base de datos
        Optional<ActuacionesModel> actuacionExistente = actuacionesService.obtenerActuacionesPorId(id);
        if (actuacionExistente.isPresent()) {
            // Actualizar la actuación con los datos proporcionados
            actuacionActualizada.setId(id);
            ActuacionesModel actuacionActualizadaBD = actuacionesService.actualizarActuaciones(actuacionActualizada);
            return ResponseEntity.ok(actuacionActualizadaBD);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<Void> borrarActuacion(@PathVariable int id) {
        Optional<ActuacionesModel> actuacion = actuacionesService.obtenerActuacionesPorId(id);
        if (actuacion.isPresent()) {
            actuacionesService.borrarActuaciones(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
