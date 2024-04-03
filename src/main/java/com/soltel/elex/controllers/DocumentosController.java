package com.soltel.elex.controllers;

import com.soltel.elex.models.DocumentosModel;
import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.services.DocumentosService;
import com.soltel.elex.services.ExpedientesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/documentos")
public class DocumentosController {

    private DocumentosService documentosService;
    private ExpedientesService expedientesService;

    @Autowired
    public DocumentosController(DocumentosService documentosService, ExpedientesService expedientesService) {
        this.documentosService = documentosService;
        this.expedientesService = expedientesService;
    }

    @GetMapping("/consultar")
    public List<DocumentosModel> consultarDocumentos() {
        return documentosService.consultarDocumentos();
    }

    @PostMapping("/insertar/{ruta}/{tasa}/{expedienteId}")
    public ResponseEntity<DocumentosModel> insertarDocumento(@PathVariable String ruta,
                                                              @PathVariable double tasa,
                                                              @PathVariable int expedienteId) {
        // Obtener el expediente correspondiente desde el servicio de expedientes
        Optional<ExpedientesModel> expedienteOptional = expedientesService.obtenerExpedientesPorId(expedienteId);
        if (!expedienteOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ExpedientesModel expediente = expedienteOptional.get();

        // Crear una nueva instancia de DocumentosModel con los datos proporcionados
        DocumentosModel nuevoDocumento = new DocumentosModel();
        nuevoDocumento.setRuta(ruta);
        nuevoDocumento.setTasa(tasa);
        nuevoDocumento.setExpediente(expediente);

        // Insertar el nuevo documento en el servicio
        DocumentosModel documentoInsertado = documentosService.insertarDocumentos(nuevoDocumento);

        // Retornar la respuesta con el nuevo documento insertado y el código de estado 201 CREATED
        return new ResponseEntity<>(documentoInsertado, HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}/{ruta}/{tasa}")
    public ResponseEntity<DocumentosModel> actualizarDocumento(@PathVariable int id,
                                                                @PathVariable String ruta,
                                                                @PathVariable double tasa) {
        // Verificar si el documento existente está presente en la base de datos
        Optional<DocumentosModel> documentoExistente = documentosService.obtenerDocumentosPorId(id);
        if (documentoExistente.isPresent()) {
            DocumentosModel documentoEnBaseDatos = documentoExistente.get();

            // Actualizar todos los campos del documento con los valores proporcionados
            documentoEnBaseDatos.setRuta(ruta);
            documentoEnBaseDatos.setTasa(tasa);

            // Guardar los cambios en el documento actualizado en la base de datos
            DocumentosModel documentoActualizado = documentosService.actualizarDocumentos(documentoEnBaseDatos);
            return ResponseEntity.ok(documentoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<Void> borrarDocumento(@PathVariable int id) {
        Optional<DocumentosModel> documento = documentosService.obtenerDocumentosPorId(id);
        if (documento.isPresent()) {
            documentosService.borrarDocumentos(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   //Agregamos endpoint para el borrado lógico de documentos
    //Agregamos endpoint para el borrado lógico de documentos
    @PutMapping("/borrarLogico/{id}")
    public ResponseEntity<?> borrarLogicoDocumentos(@PathVariable int id) {
        // Verificar si el documento existente está presente en el expediente específico
        boolean documentoEnExpediente = documentosService.existeDocumentoEnExpediente(id);
        if (documentoEnExpediente) {
            // Obtener el documento correspondiente desde el servicio
            Optional<DocumentosModel> documentoOptional = documentosService.obtenerDocumentosPorId(id);
            if (documentoOptional.isPresent()) {
                // Establecer el atributo 'borrado' en true para indicar que el documento ha sido borrado lógicamente
                DocumentosModel documentoActualizado = documentoOptional.get();
                documentoActualizado.setBorrado(true);
                
                // Actualizar el documento en el servicio para reflejar el borrado lógico
                DocumentosModel documentoGuardado = documentosService.actualizarDocumentos(documentoActualizado);
                
                // Devolver la respuesta con el documento actualizado
                return ResponseEntity.ok(documentoGuardado);
            } else {
                // Si el documento no se encuentra, devolver una respuesta 404 Not Found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento no encontrado");
            }
        } else {
            // Si el documento no pertenece al expediente específico, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El documento no pertenece al expediente");
        }
    }

    @PutMapping("/recuperarDocumentos/{id}")
    public ResponseEntity<?> recuperarDocumentos(@PathVariable int id) {
        // Verificar si el documento existente está presente en la base de datos
        Optional<DocumentosModel> documentoOptional = documentosService.obtenerDocumentosPorId(id);
        if (documentoOptional.isPresent()) {
            // Obtener el documento
            DocumentosModel documento = documentoOptional.get();
            
            // Verificar si el documento ya está recuperado (borrado = false)
            if (!documento.isBorrado()) {
                return ResponseEntity.badRequest().body("El documento ya está recuperado");
            }
            
            // Establecer el atributo 'borrado' en false para indicar que el documento ha sido recuperado
            documento.setBorrado(false);
            
            // Actualizar el documento en el servicio para reflejar la recuperación
            DocumentosModel documentoRecuperado = documentosService.actualizarDocumentos(documento);
            
            // Devolver la respuesta con el documento actualizado
            return ResponseEntity.ok(documentoRecuperado);
        } else {
            // Si el documento no se encuentra, devolver una respuesta 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento no encontrado");
        }
}


}
