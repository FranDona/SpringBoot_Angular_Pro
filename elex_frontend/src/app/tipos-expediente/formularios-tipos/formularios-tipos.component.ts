import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposService } from '../services/tipos.service';
import { Tipos } from '../models/tipos.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formularios-tipos',
  templateUrl: './formularios-tipos.component.html',
  styleUrls: ['./formularios-tipos.component.css']
})
export class FormulariosTiposComponent implements OnInit {
  tipos: Tipos[] = [];
  tiposBorrados: Tipos[] = [];
  tiposFiltrados: Tipos[] = []; // Definición de la propiedad tiposFiltrados
  mensaje: string = "";
  materia: string = "---";
  tipoParaActualizar: Tipos | null = null;
  materiaActualizar: string = '';
  searchTerm: string = '';
  searchControl = new FormControl('');

  constructor(private servicio: TiposService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarTipos();
    this.cargarTiposBorrados();
    this.searchControl.valueChanges.subscribe(value => {
      this.filtrarTipos();
    });
  }  

  cargarTipos(): void {
    this.servicio.consultarTipos().subscribe(datos => {
      this.tipos = datos;
      this.filtrarTipos(); // Aplicar el filtrado inicial
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
        this.materiaActualizar = '';
      });
    }
  }

  prepararActualizacion(tipo: Tipos): void {
    this.tipoParaActualizar = tipo;
    this.materiaActualizar = tipo.materia;
  }

  cancelarActualizacion(): void {
    this.tipoParaActualizar = null;
    this.materia = '---';
  }

  borrarTipo(id: number): void {
    if (confirm("¿Estás seguro de querer borrar definitivamente este tipo?")) {
        this.servicio.borrarTipo(id).subscribe(() => {
            this.mensaje = "Tipo borrado definitivamente";
            this.cargarTiposBorrados(); 
            this.cargarTipos();
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
            this.tipos = this.tipos.filter(tipo => tipo.id !== id);
            this.cargarTiposBorrados();
            this.cargarTipos(); // <-- Recargar la lista de tipos borrados
        });
    }
}


  recuperarTipo(id: number): void {
    this.servicio.recuperarTipo(id).subscribe(() => {
        this.snackBar.open('Tipo recuperado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
        this.cargarTiposBorrados();
        this.cargarTipos();
    });
  }

  filtrarTipos(searchTerm: string = ''): void {
    if (!searchTerm.trim()) {
      // Si no hay término de búsqueda, mostrar todos los tipos
      this.tiposFiltrados = this.tipos;
    } else {
      // Filtrar los tipos según el término de búsqueda
      this.tiposFiltrados = this.tipos.filter(tipo =>
        tipo.materia.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
