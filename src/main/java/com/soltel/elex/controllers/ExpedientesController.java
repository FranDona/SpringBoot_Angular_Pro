package com.soltel.elex.controllers;

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.models.TiposExpedienteModel;
import com.soltel.elex.services.ExpedientesService;
import com.soltel.elex.services.TiposExpedienteService;

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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/expedientes")
public class ExpedientesController {

    private ExpedientesService expedientesService;
    private TiposExpedienteService tiposExpedienteService;

    @Autowired
    public ExpedientesController(ExpedientesService expedientesService, TiposExpedienteService tiposExpedienteService) {
        this.expedientesService = expedientesService;
        this.tiposExpedienteService = tiposExpedienteService;
    }

    @GetMapping("/consultar")
    public List<ExpedientesModel> consultarExpedientes() {
        return expedientesService.consultarExpeidentes();
    }

    @PostMapping("/insertar/{codigo}/{fecha}/{estado}/{opciones}/{descripcion}/{tipoId}")
    public ResponseEntity<ExpedientesModel> insertarExpediente(@PathVariable String codigo,
                                                               @PathVariable LocalDate fecha,
                                                               @PathVariable String estado,
                                                               @PathVariable String opciones,
                                                               @PathVariable String descripcion,
                                                               @PathVariable int tipoId) {
    // Verificar si el código del expediente ya existe en la base de datos
    boolean codigoExiste = expedientesService.existeExpedientePorCodigo(codigo);
    if (codigoExiste) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build(); // De0vuelve 409 si el código del expediente ya existe
    }
    
    // Obtener el objeto TiposExpedienteModel correspondiente al tipoId
    Optional<TiposExpedienteModel> tipoExpedienteOptional = tiposExpedienteService.obtenerTipoPorId(tipoId);
    if (!tipoExpedienteOptional.isPresent()) {
        return ResponseEntity.notFound().build(); // Devuelve 404 si el tipo de expediente no se encuentra
    }

    TiposExpedienteModel tipoExpediente = tipoExpedienteOptional.get();

    // Crear un nuevo objeto ExpedientesModel
    ExpedientesModel nuevoExpediente = new ExpedientesModel();
    nuevoExpediente.setCodigo(codigo);
    nuevoExpediente.setFecha(fecha);
    nuevoExpediente.setEstado(estado);
    nuevoExpediente.setOpciones(opciones);
    nuevoExpediente.setDescripcion(descripcion);
    nuevoExpediente.setTipo(tipoExpediente);

    // Insertar el nuevo expediente en el servicio
    ExpedientesModel expedienteInsertado = expedientesService.insertarExpedientes(nuevoExpediente);

    // Retornar la respuesta con el nuevo expediente insertado y el código de estado 201 CREATED
    return new ResponseEntity<>(expedienteInsertado, HttpStatus.CREATED);
    }

    
    @PutMapping("/actualizar/{id}/{codigo}/{fecha}/{estado}/{opciones}/{descripcion}/{tipoId}")
    public ResponseEntity<ExpedientesModel> actualizarExpediente(@PathVariable int id,
                                                                 @PathVariable String codigo,
                                                                 @PathVariable LocalDate fecha,
                                                                 @PathVariable String estado,
                                                                 @PathVariable String opciones,
                                                                 @PathVariable String descripcion,
                                                                 @PathVariable int tipoId) {
        // Verificar si el expediente existente está presente en la base de datos
        Optional<ExpedientesModel> expedienteExistente = expedientesService.obtenerExpedientesPorId(id);
        if (expedienteExistente.isPresent()) {
            ExpedientesModel expedienteEnBaseDatos = expedienteExistente.get();
    
            // Actualizar todos los campos del expediente con los valores proporcionados
            expedienteEnBaseDatos.setCodigo(codigo);
            expedienteEnBaseDatos.setFecha(fecha);
            expedienteEnBaseDatos.setEstado(estado);
            expedienteEnBaseDatos.setOpciones(opciones);
            expedienteEnBaseDatos.setDescripcion(descripcion);
    
            // Obtener el objeto TipoExpedienteModel asociado al tipoId y asignarlo al expediente
            Optional<TiposExpedienteModel> tipoExpedienteOptional = tiposExpedienteService.obtenerTipoPorId(tipoId);
            if (tipoExpedienteOptional.isPresent()) {
                expedienteEnBaseDatos.setTipo(tipoExpedienteOptional.get());
            } else {
                return ResponseEntity.notFound().build(); // Si el tipo de expediente no se encuentra, devolver 404
            }
    
            // Guardar los cambios en el expediente actualizado en la base de datos
            ExpedientesModel expedienteActualizado = expedientesService.actualizarExpediente(expedienteEnBaseDatos);
            return ResponseEntity.ok(expedienteActualizado);
        } else {
            return ResponseEntity.notFound().build(); // Si el expediente no se encuentra, devolver 404
        }
    }
    
    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<Void> borrarExpediente(@PathVariable int id) {
        Optional<ExpedientesModel> expediente = expedientesService.obtenerExpedientesPorId(id);
        if (expediente.isPresent()) {
            expedientesService.borrarExpedeintes(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //Agragamos endpoint para el borrado lógico
    @PutMapping("/borrarLogico/{id}")
    public ResponseEntity<?> borrarLogicoExpedientes(@PathVariable int id) {
        // Verificar si el expediente existente está presente en la base de datos
        Optional<ExpedientesModel> expediente = expedientesService.obtenerExpedientesPorId(id);
        if (expediente.isPresent()) {
            // Establecer el atributo 'borrado' en true para indicar que el expediente ha sido borrado lógicamente
            ExpedientesModel expedienteActualizado = expediente.get();
            expedienteActualizado.setBorrado(true);
            
            // Actualizar el expediente en el servicio para reflejar el borrado lógico
            ExpedientesModel expedienteGuardado = expedientesService.actualizarExpediente(expedienteActualizado);
            
            // Devolver la respuesta con el expediente actualizado
            return ResponseEntity.ok(expedienteGuardado);
        } else {
            // Si el expediente no se encuentra, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expediente no encontrado");
        }
    }

    @PutMapping("/recuperarExpedientes/{id}")
    public ResponseEntity<?> recuperarExpedientes(@PathVariable int id) {
        // Verificar si el expediente existente está presente en la base de datos
        Optional<ExpedientesModel> expedienteOptional = expedientesService.obtenerExpedientesPorId(id);
        if (expedienteOptional.isPresent()) {
            // Obtener el expediente
            ExpedientesModel expediente = expedienteOptional.get();
            
            // Verificar si el expediente ya está recuperado (borrado = false)
            if (!expediente.isBorrado()) {
                return ResponseEntity.badRequest().body("El expediente ya está recuperado");
            }
            
            // Establecer el atributo 'borrado' en false para indicar que el expediente ha sido recuperado
            expediente.setBorrado(false);
            
            // Actualizar el expediente en el servicio para reflejar la recuperación
            ExpedientesModel expedienteRecuperado = expedientesService.actualizarExpediente(expediente);
            
            // Devolver la respuesta con el expediente actualizado
            return ResponseEntity.ok(expedienteRecuperado);
        } else {
            // Si el expediente no se encuentra, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expediente no encontrado");
        }
    }



}
