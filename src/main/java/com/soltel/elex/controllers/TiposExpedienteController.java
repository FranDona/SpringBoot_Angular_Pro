package com.soltel.elex.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.TiposExpedienteModel;
import com.soltel.elex.services.TiposExpedienteService;

@RestController
@RequestMapping("/tipos_expediente")
public class TiposExpedienteController {
    @Autowired
    private TiposExpedienteService servicioTipo;

    @GetMapping("/consultar")
    public List<TiposExpedienteModel> dameTiposExpediente() {
        return servicioTipo.consultarTipos();
    }
    @PostMapping("/insertar/{materia}")
    public ResponseEntity<?> insertarTipo(@PathVariable String materia) {
    // Verifica si la materia ya existe en la base de datos
    boolean materiaExiste = servicioTipo.existeMateria(materia);
    if (materiaExiste) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("La materia ya existe"); // Devuelve 409 si la materia ya existe
    }
    
    // Usamos el siguiente codigo para Angular Material
    // Si la materia no existe, procede con la inserción normalmente
    TiposExpedienteModel tipo = new TiposExpedienteModel();
    tipo.setMateria(materia);
    return ResponseEntity.ok(servicioTipo.insertarTipo(tipo));
    }

    @PutMapping("/actualizar/{id}/{materia}")
    public ResponseEntity<?> actualizarTipo(@PathVariable int id, @PathVariable String materia) {
        Optional<TiposExpedienteModel> tipo = servicioTipo.obtenerTipoPorId(id);
        if (tipo.isPresent()) {
            TiposExpedienteModel tipoActualizado = tipo.get();
            tipoActualizado.setMateria(materia);
            TiposExpedienteModel guardaTipo = servicioTipo.actualizarTipo(tipoActualizado);
            return ResponseEntity.ok(guardaTipo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tipo no encontrado");
        }
    }

    // Otra forma de hacerlo...
    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<Void> borrarTipo(@PathVariable int id) {
        return servicioTipo.obtenerTipoPorId(id)
                .map(tipo -> {
                    servicioTipo.borrarTipo(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Agragamos endpoint para el borrado lógico
    @PutMapping("/borrarLogico/{id}")
    public ResponseEntity<?> borrarLogicoTipo(@PathVariable int id) {
        // Verificar si el tipo de expediente existente está presente en la base de datos
        Optional<TiposExpedienteModel> tipo = servicioTipo.obtenerTipoPorId(id);
        if (tipo.isPresent()) {
            // Establecer el atributo 'borrado' en true para indicar que el tipo de expediente ha sido borrado lógicamente
            TiposExpedienteModel tipoActualizado = tipo.get();
            tipoActualizado.setBorrado(true);
            
            // Actualizar el tipo de expediente en el servicio para reflejar el borrado lógico
            TiposExpedienteModel tipoGuardado = servicioTipo.actualizarTipo(tipoActualizado);
            
            // Devolver la respuesta con el tipo de expediente actualizado
            return ResponseEntity.ok(tipoGuardado);
        } else {
            // Si el tipo de expediente no se encuentra, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tipo de expediente no encontrado");
        }
    }

    @PutMapping("/recuperarTipo/{id}")
    public ResponseEntity<?> recuperarTipo(@PathVariable int id) {
        // Verificar si el tipo de expediente existente está presente en la base de datos
        Optional<TiposExpedienteModel> tipoOptional = servicioTipo.obtenerTipoPorId(id);
        if (tipoOptional.isPresent()) {
            // Obtener el tipo de expediente
            TiposExpedienteModel tipo = tipoOptional.get();
            
            // Verificar si el tipo de expediente ya está recuperado (borrado = false)
            if (!tipo.isBorrado()) {
                return ResponseEntity.badRequest().body("El tipo de expediente ya está recuperado");
            }
            
            // Establecer el atributo 'borrado' en false para indicar que el tipo de expediente ha sido recuperado
            tipo.setBorrado(false);
            
            // Actualizar el tipo de expediente en el servicio para reflejar la recuperación
            TiposExpedienteModel tipoRecuperado = servicioTipo.actualizarTipo(tipo);
            
            // Devolver la respuesta con el tipo de expediente actualizado
            return ResponseEntity.ok(tipoRecuperado);
        } else {
            // Si el tipo de expediente no se encuentra, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tipo de expediente no encontrado");
        }
    }

    
    

}