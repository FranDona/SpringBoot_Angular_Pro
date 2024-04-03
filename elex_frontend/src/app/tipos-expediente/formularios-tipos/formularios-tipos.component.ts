import { Component, OnInit } from '@angular/core';

// Importacion de Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

import { TiposService } from '../services/tipos.service';
import { Tipos } from '../models/tipos.model';
import * as bootstrap from 'bootstrap'; // Importación de Bootstrap


@Component({
  selector: 'app-formularios-tipos',
  templateUrl: './formularios-tipos.component.html',
  styleUrls: ['./formularios-tipos.component.css']
})
export class FormulariosTiposComponent implements OnInit {
  tipos: Tipos[] = [];
  tiposBorrados: Tipos[] = [];
  mensaje: string = "";
  materia: string = "---";
  tipoParaActualizar: Tipos | null = null;
  materiaActualizar: string = ''; // Propiedad para la materia a actualizar en el modal de actualización

  // Inyectar "private snackBar: MatSnackBar para Angular Material
  constructor(private servicio: TiposService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarTipos();
    this.cargarTiposBorrados();
  }  

  cargarTipos(): void {
    this.servicio.consultarTipos().subscribe(datos => {
      this.tipos = datos;
    });
  }

  cargarTiposBorrados(): void {
    this.servicio.consultarTiposBorrados().subscribe(datos => {
      this.tiposBorrados = datos;
    });
  }
  


  insertarTipo(): void {
    this.servicio.insertarTipo(this.materia).subscribe(
      resultado => {
        if (resultado) {
          this.mensaje = "Tipo insertado";
          this.cargarTipos();
        }
      },
      //Mensaje de Angular Material
      error => {
        this.snackBar.open('Materia duplicada o usada anteriormente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }


  actualizarTipoFormulario(): void {
    if (this.tipoParaActualizar && this.materiaActualizar) {
      this.servicio.actualizarTipo(this.tipoParaActualizar.id, this.materiaActualizar).subscribe(resultado => {
        this.mensaje = "Tipo actualizado";
        this.cargarTipos();
        this.tipoParaActualizar = null;
        this.materiaActualizar = ''; // Limpiar la variable después de la actualización
      });
    }
  }

  prepararActualizacion(tipo: Tipos): void {
    this.tipoParaActualizar = tipo;
    this.materiaActualizar = tipo.materia; // Cargar el nombre del campo que se quiere actualizar
  }

  cancelarActualizacion(): void {
    this.tipoParaActualizar = null;
    this.materia = '---';
  }

  borrarTipo(id: number): void {
    if (confirm("¿Estás seguro de querer borrar definitivamente este tipo?")) {
        this.servicio.borrarTipo(id).subscribe(() => {
            this.mensaje = "Tipo borrado definitivamente";
            // Actualiza la lista de tipos después de borrar definitivamente
            this.cargarTiposBorrados(); 
            // Vuelve a cargar los tipos después de borrar definitivamente
            this.cargarTipos();
            // Muestra una notificación de eliminación definitiva
            this.snackBar.open('Tipo eliminado definitivamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
            });
        });
    }
  }
  

  borradoLogicoTipo(id: number): void {
    if (confirm("¿Estás seguro de querer borrar lógicamente este tipo?")) {
      this.servicio.borradoLogicoTipo(id).subscribe(() => {
        this.snackBar.open('Tipo borrado lógicamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        // Eliminar el tipo del arreglo tipos después de realizar el borrado lógico
        this.tipos = this.tipos.filter(tipo => tipo.id !== id);
        // Vuelve a cargar la lista de tipos borrados después de realizar el borrado lógico
        this.cargarTiposBorrados();
      });
    }
  }

  recuperarTipo(id: number): void {
    // Recuperar un tipo borrado
    this.servicio.recuperarTipo(id).subscribe(() => {
        this.snackBar.open('Tipo recuperado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
        // Vuelve a cargar los tipos después de la recuperación
        this.cargarTipos();
    });
}

}

