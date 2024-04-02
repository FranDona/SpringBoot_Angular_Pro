import { Component, OnInit } from '@angular/core';

import { ExpedientesService } from '../services/expedientes.service';
import { Expedientes } from '../models/expedientes.model';

@Component({
  selector: 'app-formularios-expedientes',
  templateUrl: './formularios-expedientes.component.html',
  styleUrls: ['./formularios-expedientes.component.css']
})
export class FormulariosExpedientesComponent implements OnInit {
  expedientes: Expedientes[] = [];
  mensaje: string = "";

  codigo: string = "";
  fecha: string = "";
  estado: 'Pendiente' | 'Enviado' | 'Erróneo' = 'Pendiente';
  opciones: string = "";
  descripcion: string = "";
  tipo: string = "---";

  expedienteParaActualizar: Expedientes | null = null;

  constructor(public servicio: ExpedientesService) {}

  ngOnInit(): void {
    this.cargarExpedientes();
  }

  cargarExpedientes(): void {
    this.servicio.consultarExpedientes().subscribe(datos => {
      this.expedientes = datos;
    });
  }

  insertarExpediente(): void {
    const nuevoExpediente: Expedientes = {
      id: 0, // El ID se generará en el backend
      codigo: this.codigo,
      fecha: this.fecha,
      estado: this.estado,
      opciones: this.opciones,
      descripcion: this.descripcion,
      tipo: this.tipo,
      borrado: false, // Puedes ajustar según necesidades
      fecha_creacion: '' // Puedes ajustar según necesidades
    };

    this.servicio.insertarExpediente(nuevoExpediente).subscribe(resultado => {
      if(resultado) {
        this.mensaje = "Expediente insertado";
        this.cargarExpedientes();
        // Limpiar campos después de la inserción si es necesario
        this.limpiarCampos();
      }
    });
  }

  actualizarExpediente(): void {
    if (this.expedienteParaActualizar) {
      this.servicio.actualizarExpediente(this.expedienteParaActualizar.id, this.expedienteParaActualizar).subscribe(resultado => {
        this.mensaje = "Expediente actualizado";
        this.cargarExpedientes();
        this.expedienteParaActualizar = null;
        this.limpiarCampos();
      });
    }
  }

  prepararActualizacion(expediente: Expedientes): void {
    this.expedienteParaActualizar = expediente;
    // Puedes establecer los valores de los campos en el formulario aquí si lo necesitas
    this.codigo = expediente.codigo;
    this.fecha = expediente.fecha;
    this.estado = expediente.estado;
    this.opciones = expediente.opciones;
    this.descripcion = expediente.descripcion;
    this.tipo = expediente.tipo;
  }

  cancelarActualizacion(): void {
    this.expedienteParaActualizar = null;
    this.limpiarCampos();
  }

  limpiarCampos(): void {
    this.codigo = "";
    this.fecha = "";
    this.estado = 'Pendiente';
    this.opciones = "";
    this.descripcion = "";
    this.tipo = "---";
  }

  borrarExpediente(id: number): void {
    if(confirm("¿Estás seguro de querer borrar este expediente?")) {
      this.servicio.borrarExpediente(id).subscribe(() => {
        this.mensaje = "Expediente borrado";
        this.cargarExpedientes();
      });
    }
  }

  getTipoNombre(idTipo: string): string {
    const tiposExpediente: { [key: string]: string } = {
      '1': 'Tipo 1',
      '2': 'Tipo 2',
      '3': 'Tipo 3',
      // Agrega más tipos según sea necesario
    };
  
    return tiposExpediente[idTipo] || '';
  }
}
