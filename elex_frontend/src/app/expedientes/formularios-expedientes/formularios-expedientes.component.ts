import { Component, OnInit } from '@angular/core';

// Importacion de Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExpedientesService } from '../services/expedientes.service';
import { Expedientes } from '../models/expedientes.model';
import { Tipos } from '../../tipos-expediente/models/tipos.model';

@Component({
  selector: 'app-formularios-expedientes',
  templateUrl: './formularios-expedientes.component.html',
  styleUrls: ['./formularios-expedientes.component.css']
})
export class FormulariosExpedientesComponent implements OnInit {
  expedientes: Expedientes[] = [];
  mensaje: string = "";
  tipos: Tipos[] = [];

  codigo: string = "";
  fecha: string = "";
  estado: 'Pendiente' | 'Enviado' | 'Erróneo' = 'Pendiente';
  opciones: string = "";
  descripcion: string = "";
  tipoId: number = 0;

  constructor(public servicio: ExpedientesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarExpedientes();
    this.cargarTipos(); // Aquí se llama al método cargarTipos() en el ngOnInit()
  }

  cargarExpedientes(): void {
    this.servicio.consultarExpedientes().subscribe(datos => {
      this.expedientes = datos;
    });
  }

  insertarExpedientes(): void {
    this.servicio.insertarExpedientes(this.codigo, this.fecha, this.estado, this.opciones, this.descripcion, this.tipoId).subscribe(
      resultado => {
        if (resultado) {
          this.mensaje = "Expediente Insertado";
          this.cargarExpedientes();
        }
      },
      // Manejo de error para mostrar la notificación
      error => {
        this.snackBar.open('El codigo esta duplicado o se ha usado anteriormente para otro caso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  cargarTipos(): void {
    this.servicio.consultarTipos().subscribe(tipos => {
      this.tipos = tipos;
    });
  }

    // Atributo tipo que usamos para actualizar
  expedientesParaActualizar: Expedientes | null = null;


  actualizarExpedientes(): void {
    if (this.expedientesParaActualizar && this.codigo && this.fecha && this.estado && this.opciones && this.descripcion && this.tipoId) {
      this.servicio.actualizarExpedientes(this.expedientesParaActualizar.id, this.codigo, this.fecha, this.estado, this.opciones, this.descripcion, this.tipoId).subscribe(resultado => {
        this.mensaje = "Expediente actualizado";
        this.cargarExpedientes();
        this.expedientesParaActualizar = null;
        this.codigo  = "";
        this.fecha  = "";
        this.estado = "Pendiente";
        this.opciones  = "";
        this.descripcion  = "";
        this.tipoId  = 0;
      })
    }
  }

  prepararActualizacion(documento: Expedientes): void {
    this.expedientesParaActualizar = documento;
    this.codigo = documento.codigo;
    this.fecha = documento.fecha;
    this.estado = documento.estado;
    this.opciones = documento.opciones;
    this.descripcion = documento.descripcion;
    this.tipoId = documento.tipo.id;
  }


  cancelarActualizacion(): void {
    this.expedientesParaActualizar = null;
    this.cargarExpedientes();
    this.expedientesParaActualizar = null;
    this.codigo  = "";
    this.fecha  = "";
    this.estado = "Pendiente";
    this.opciones  = "";
    this.descripcion  = "";
    this.tipoId  = 0;
  }

    // Y el borrado...
    borrarExpedientes(id: number): void {
      if (confirm("¿Estás seguro de querer borrar este Expediente?")) {
        this.servicio.borrarExpedientes(id).subscribe(() => {
          this.mensaje = "Documento borrado";
          this.cargarExpedientes();
        });
      }
    }

    borradoLogicoExpedientes(id: number): void {
      if (confirm("¿Estás seguro de querer borrar lógicamente este expediente?")) {
        this.servicio.borradoLogicoExpedientes(id).subscribe(() => {
          this.mensaje = "Tipo borrado lógicamente";
          this.cargarTipos();
        });
      }
    }
}
