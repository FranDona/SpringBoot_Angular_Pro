import { Component, OnInit } from '@angular/core';

// Importacion de Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActuacionesService } from '../services/actuaciones.service';
import { Actuaciones } from '../models/actuaciones.model';
import { Expedientes } from '../../expedientes/models/expedientes.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-formularios-actuaciones',
  templateUrl: './formularios-actuaciones.component.html',
  styleUrl: './formularios-actuaciones.component.css'
})
export class FormulariosActuacionesComponent implements OnInit {
  actuaciones: Actuaciones[] = [];
  actuacionesBorradas: Actuaciones[] = [];
  actuacionesFiltradas: Actuaciones[] = [];
  mensaje = "";
  expedientes: Expedientes[] = []; // Añadimos un arreglo para almacenar los expedientes
  descripcion: string = "";
  finalizado: boolean = false;
  fecha: string = "";
  expedienteId: number = 0;
  descripcionActualizar = "";
  finalizadoActualizar: boolean = false;
  fechaActualizar: string = "";
  borrado: boolean = false;
  actuacionesParaActualizar: Actuaciones | null = null;
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  loading: boolean = false;

  // Inyectar "private snackBar: MatSnackBar para Angular Material
  constructor(private servicio: ActuacionesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarActuaciones();
    this.cargarExpedientes();
    this.cargarActuacionesBorradas();
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.filtrarActuaciones(value);
    });
  }

  cargarActuaciones(): void {
    this.loading = true;
    this.servicio.consultarActuaciones().subscribe(datos => {
      this.actuaciones = datos;
      this.filtrarActuaciones(this.searchTerm);
      this.loading = false;
    });
  }

  cargarActuacionesBorradas(): void {
    this.loading = true;
    this.servicio.consultarActuacionesBorradas().subscribe(datos => {
      this.actuacionesBorradas = datos;
    });
  }

  cargarExpedientes(): void {
    this.loading = true;
    this.servicio.consultarExpedientes().subscribe(expedientes => {
      this.expedientes = expedientes;
    });
  }

  insertarActuaciones(): void {
    this.loading = true;
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




  actualizarActuacionesFormulario(): void {
    if (this.actuacionesParaActualizar && this.descripcionActualizar !== null && this.finalizadoActualizar !== null && this.fechaActualizar !== null) {
      // Formatear la fecha para que coincida con el formato esperado por el backend, por ejemplo:
      // const fechaFormateada = new Date(this.fechaActualizar).toISOString();
      
      this.servicio.actualizarActuaciones(this.actuacionesParaActualizar.id, this.descripcionActualizar, this.finalizadoActualizar, this.fechaActualizar).subscribe(
        () => {
          this.mensaje = "Actuacion actualizada";
          this.cargarActuaciones();
          this.actuacionesParaActualizar = null;
          this.resetFormulario();
          this.descripcionActualizar = "";
          this.finalizadoActualizar = false;
          this.fechaActualizar = "";
        },
        (error) => {
          console.error('Error al actualizar la actuacion:', error);
          this.snackBar.open('Error al actualizar la actuacion', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      );
    }
  }
  





  prepararActualizacion(actuacion: Actuaciones): void {
    this.actuacionesParaActualizar = actuacion;
    this.descripcionActualizar = actuacion.descripcion;
    this.fechaActualizar = actuacion.fecha;
  }

  cancelarActualizacion(): void {
    this.loading = true;
    this.actuacionesParaActualizar = null;
    this.resetFormulario();
  }
  resetFormulario(): void {
    this.loading = true;
    this.descripcion = "";
    this.finalizado = false;
    this.fecha = "";
    this.expedienteId = 0;
  }

  borrarActuaciones(id: number): void {
    this.loading = true;
    if (confirm("¿Estás seguro de querer borrar esta actuacion?")) {
      this.servicio.borrarActuaciones(id).subscribe(() => {
        this.mensaje = "Actuacion borrado";
        this.cargarActuacionesBorradas();
        this.cargarActuaciones();
      });
    }
  }


  borradoLogicoActuaciones(id: number): void {
    if (confirm('¿Estás seguro de querer borrar lógicamente este documento?')) {
      this.servicio.borradoLogicoActuaciones(id).subscribe(
        () => {
          this.mensaje = 'Documento borrado lógicamente';
          this.loading = true;
          this.snackBar.open('Documento borrado lógicamente correctamente', 'Cerrar', {
            duration: 5000, // Duración extendida a 5 segundos
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.cargarActuacionesBorradas(); 
          this.cargarActuaciones(); 
        },
        (error) => {
          this.snackBar.open('Error al borrar lógicamente el documento', 'Cerrar', {
            duration: 5000, // Duración extendida a 5 segundos
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      );
    }
  }


  recuperarActuaciones(id: number): void {
    this.servicio.recuperarActuaciones(id).subscribe(() => {
        this.snackBar.open('Actuacion recuperada correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
        this.loading = true;
        this.cargarActuacionesBorradas();
        this.cargarActuaciones();
    });
  }


  filtrarActuaciones(searchTerm: string = ''): void {
    if (!searchTerm.trim()) {
      // Si no hay término de búsqueda, mostrar todas las actuaciones
      this.actuacionesFiltradas = this.actuaciones;
    } else {
      // Convertir el término de búsqueda a minúsculas para una comparación insensible a mayúsculas y minúsculas
      const searchTermLowerCase = searchTerm.toLowerCase();
      // Filtrar las actuaciones según el término de búsqueda en varios campos
      this.actuacionesFiltradas = this.actuaciones.filter(actuacion =>
        actuacion.expediente.codigo.toLowerCase().includes(searchTermLowerCase) ||
        actuacion.expediente.fecha.toLowerCase().includes(searchTermLowerCase) ||
        actuacion.expediente.estado.toLowerCase().includes(searchTermLowerCase)
      );
    }
  }
}
