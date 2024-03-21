package com.soltel.elex.controllers;

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.models.TiposExpedienteModel;
import com.soltel.elex.services.ExpedientesService;
import com.soltel.elex.services.TiposExpedienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.sql.Date;

@RestController
@RequestMapping("/expedientes")
public class ExpedientesController {

    private final ExpedientesService expedientesService;
    private final TiposExpedienteService tiposExpedienteService;

    @Autowired
    public ExpedientesController(ExpedientesService expedientesService, TiposExpedienteService tiposExpedienteService) {
        this.expedientesService = expedientesService;
        this.tiposExpedienteService = tiposExpedienteService;
    }

    @PostMapping("/insertar/{codigo}/{fecha}/{estado}/{opciones}/{descripcion}/{tipo}")
    public ResponseEntity<ExpedientesModel> createExpediente(@PathVariable String codigo,
                                                              @PathVariable String fecha,
                                                              @PathVariable String estado,
                                                              @PathVariable String opciones,
                                                              @PathVariable String descripcion,
                                                              @PathVariable int tipo) {
        TiposExpedienteModel tipoExpediente = tiposExpedienteService.obtenerTipoPorId(tipo)
                .orElseThrow(() -> new NoSuchElementException("Tipo de expediente no encontrado"));

        // Convertir String de fecha a java.sql.Date
        Date fechaSQL = Date.valueOf(fecha);

        ExpedientesModel nuevoExpediente = new ExpedientesModel();
        nuevoExpediente.setCodigo(codigo);
        nuevoExpediente.setFecha(fechaSQL);
        nuevoExpediente.setEstado(estado);
        nuevoExpediente.setOpciones(opciones);
        nuevoExpediente.setDescripcion(descripcion);
        nuevoExpediente.setTipo(tipoExpediente);

        ExpedientesModel expedienteGuardado = expedientesService.saveExpediente(nuevoExpediente);
        return ResponseEntity.ok(expedienteGuardado);
    }

    // Otros métodos de consulta y manipulación de expedientes aquí...
}
