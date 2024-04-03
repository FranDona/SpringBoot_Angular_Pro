import { Component, OnInit } from '@angular/core';

// Importacion de Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActuacionesService } from '../services/actuaciones.service';
import { Actuaciones } from '../models/actuaciones.model';
import { Expedientes } from '../../expedientes/models/expedientes.model';

@Component({
  selector: 'app-formularios-actuaciones',
  templateUrl: './formularios-actuaciones.component.html',
  styleUrl: './formularios-actuaciones.component.css'
})
export class FormulariosActuacionesComponent implements OnInit {
  actuaciones: Actuaciones[] = [];
  mensaje = "";
  expedientes: Expedientes[] = []; // Añadimos un arreglo para almacenar los expedientes

  descripcion: string = "";
  finalizado: boolean = false;
  fecha: string = "";
  expedienteId: number = 0;
  borrado: boolean = false;

  // Inyectar "private snackBar: MatSnackBar para Angular Material
  constructor(private servicio: ActuacionesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarActuaciones();
    this.cargarExpedientes(); // Llamamos al método para cargar expedientes en el ngOnInit
  }

  cargarActuaciones(): void {
    this.servicio.consultarActuaciones().subscribe(datos => {
      this.actuaciones = datos;
    });
  }

  insertarActuaciones(): void {
    this.servicio.insertarActuaciones(this.descripcion, this.finalizado, this.fecha, this.expedienteId).subscribe(resultado => {
      if (resultado) {
        this.mensaje = "Actuacion Insertada";
        this.cargarActuaciones();
      }
    },
      //Mensaje de Angular Material
      error => {
        this.snackBar.open('Actuacion duplicada', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  cargarExpedientes(): void {
    this.servicio.consultarExpedientes().subscribe(expedientes => {
      this.expedientes = expedientes;
    });
  }

  // Atributo tipo que usamos para actualizar
  actuacionesParaActualizar: Actuaciones | null = null;

  actualizarActuaciones(): void {
    if (this.actuacionesParaActualizar && this.descripcion && this.finalizado && this.fecha && this.expedienteId) {
      this.servicio.actualizarActuaciones(this.actuacionesParaActualizar.id, this.descripcion, this.finalizado, this.fecha, this.expedienteId).subscribe(resultado => {
        this.mensaje = "Documento actualizado";
        this.cargarActuaciones();
        this.actuacionesParaActualizar = null;
        this.descripcion = "";
        this.fecha = "";
        this.expedienteId = 0;

      })
    }
  }

  prepararActualizacion(actuacion: Actuaciones): void {
    this.actuacionesParaActualizar = actuacion;
    this.descripcion = actuacion.descripcion;
    this.fecha = actuacion.fecha;
    this.expedienteId = actuacion.expediente.id;
    this.borrado = actuacion.borrado;
  }

  cancelarActualizacion(): void {
    this.actuacionesParaActualizar = null;
    this.cargarActuaciones();
    this.actuacionesParaActualizar = null;
    this.descripcion = "";
    this.fecha = "";
    this.expedienteId = 0;
  }

  borrarActuaciones(id: number): void {
    if (confirm("¿Estás seguro de querer borrar esta actuacion?")) {
      this.servicio.borrarActuaciones(id).subscribe(() => {
        this.mensaje = "Actuacion borrado";
        this.cargarActuaciones();
      });
    }
  }

  borradoLogicoActuaciones(id: number): void {
    if (confirm("¿Estás seguro de querer borrar lógicamente este tipo?")) {
      this.servicio.borradoLogicoActuaciones(id).subscribe(() => {
        this.mensaje = "Actucion borrada lógicamente";
        this.cargarActuaciones();
      });
    }
  }
}
