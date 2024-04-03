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
    public ResponseEntity<?> insertarActuacion(@PathVariable String descripcion,
                                                @PathVariable boolean finalizado,
                                                @PathVariable LocalDate fecha,
                                                @PathVariable int expedienteId) {
    
        // Verificar si la actuación ya existe en la base de datos
        boolean actuacionExiste = actuacionesService.existeActuacion(descripcion);
        if (actuacionExiste) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La actuación ya existe"); // Devuelve 409 si la actuación ya existe
        }
    
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

    //Agregamos endpoint para el borrado lógico de actuaciones
    @PutMapping("/borrarLogico/{id}")
    public ResponseEntity<?> borrarLogicoActuacion(@PathVariable int id) {
        // Verificar si la actuación existente está presente en la base de datos
        Optional<ActuacionesModel> actuacion = actuacionesService.obtenerActuacionesPorId(id);
        if (actuacion.isPresent()) {
            // Establecer el atributo 'borrado' en true para indicar que la actuación ha sido borrada lógicamente
            ActuacionesModel actuacionActualizada = actuacion.get();
            actuacionActualizada.setBorrado(true);
            
            // Actualizar la actuación en el servicio para reflejar el borrado lógico
            ActuacionesModel actuacionGuardada = actuacionesService.actualizarActuaciones(actuacionActualizada);
            
            // Devolver la respuesta con la actuación actualizada
            return ResponseEntity.ok(actuacionGuardada);
        } else {
            // Si la actuación no se encuentra, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Actuación no encontrada");
        }
    }

    @PutMapping("/recuperarActuacion/{id}")
    public ResponseEntity<?> recuperarActuacion(@PathVariable int id) {
        // Verificar si la actuación existente está presente en la base de datos
        Optional<ActuacionesModel> actuacionOptional = actuacionesService.obtenerActuacionesPorId(id);
        if (actuacionOptional.isPresent()) {
            // Obtener la actuación
            ActuacionesModel actuacion = actuacionOptional.get();
            
            // Verificar si la actuación ya está recuperada (borrada = false)
            if (!actuacion.isBorrado()) {
                return ResponseEntity.badRequest().body("La actuación ya está recuperada");
            }
            
            // Establecer el atributo 'borrada' en false para indicar que la actuación ha sido recuperada
            actuacion.setBorrado(false);
            
            // Actualizar la actuación en el servicio para reflejar la recuperación
            ActuacionesModel actuacionRecuperada = actuacionesService.actualizarActuaciones(actuacion);
            
            // Devolver la respuesta con la actuación actualizada
            return ResponseEntity.ok(actuacionRecuperada);
        } else {
            // Si la actuación no se encuentra, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Actuación no encontrada");
        }
    }


}
