import { Component, OnInit } from '@angular/core';

// Importacion de Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExpedientesService } from '../services/expedientes.service';
import { Expedientes } from '../models/expedientes.model';
import { Tipos } from '../../tipos-expediente/models/tipos.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-formularios-expedientes',
  templateUrl: './formularios-expedientes.component.html',
  styleUrls: ['./formularios-expedientes.component.css']
})
export class FormulariosExpedientesComponent implements OnInit {
  expedientes: Expedientes[] = [];
  expedientesBorrados: Expedientes[] = [];
  expedientesFiltrados: Expedientes[] = [];
  mensaje: string = "";
  tipos: Tipos[] = [];

  codigo: string = "";
  fecha: string = "";
  estado: 'Pendiente' | 'Enviado' | 'Erróneo' = 'Pendiente';
  opciones: string = "";
  descripcion: string = "";
  tipoId: number = 0;
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  loading: boolean = false;

  codigoAutomatico: string = "";
  codigoPersonalizado: string = "";
  usarCodigoPersonalizado: boolean = false; // Nuevo atributo para controlar la visibilidad del campo de código personalizado
  placeholderCodigo = "Codigo Automático"


  constructor(public servicio: ExpedientesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarExpedientes();
    this.cargarTipos(); // Aquí se llama al método cargarTipos() en el ngOnInit()
    this.cargarExpedientesBorrados();
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.filtrarExpedientes(value);
    });
  }

  cargarExpedientes(): void {
    this.loading = true;
    this.servicio.consultarExpedientes().subscribe(datos => {
      this.expedientes = datos;
      this.filtrarExpedientes(this.searchTerm);
      this.loading = false; 
    });
  }

  cargarExpedientesBorrados(): void {
    this.loading = true;
    this.servicio.consultarExpedientesBorrados().subscribe(datos => {
      this.expedientesBorrados = datos;
    });
  }
  
  
  cargarTipos(): void {
    this.loading = true;
    this.servicio.consultarTipos().subscribe(tipos => {
      this.tipos = tipos;
    });
  }
  

  insertarExpedientes(): void {
    this.loading = true;
    
    let codigoGenerado: string;
    
    // Verificar si el campo de código está vacío
    if (!this.codigo.trim()) {
      // Generar el código automáticamente si el campo está vacío
      codigoGenerado = this.generarCodigoAutomatico();
    } else {
      // Usar el código proporcionado por el usuario si no está vacío
      codigoGenerado = this.codigo;
    }
    
    // Llamar al servicio para insertar el expediente con el código generado
    this.servicio.insertarExpedientes(codigoGenerado, this.fecha, this.estado, this.opciones, this.descripcion, this.tipoId).subscribe(
      resultado => {
        if (resultado) {
          this.mensaje = "Expediente Insertado";
          this.cargarExpedientes();
          this.limpiarFormulario();
        }
      },
      // Manejo de error para mostrar la notificación
      error => {
        this.snackBar.open('El código está duplicado o se ha utilizado anteriormente para otro expediente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }
  
  generarCodigoAutomatico(): string {
    
    // Obtener el último código de expediente en la lista
    const ultimoCodigo = this.expedientes.length > 0 ? this.expedientes[this.expedientes.length - 1].codigo : "EXP000";
    
    // Extraer el número del código y generar el nuevo número incrementado
    
    const numero = parseInt(ultimoCodigo.substring(3));
    const nuevoNumero = numero + 1;
    
    // Formatear el nuevo número y devolver el código generado
    return "COD" + nuevoNumero.toString().padStart(3, '0');
  }

  limpiarFormulario(): void {
  this.codigo = '';
  this.fecha = '';
  this.estado = 'Pendiente';
  this.opciones = '';
  this.descripcion = '';
  this.tipoId = 0;
}


  toggleCampoCodigo(): void {
    this.usarCodigoPersonalizado = !this.usarCodigoPersonalizado; // Cambiar entre true y false
    this.placeholderCodigo = this.usarCodigoPersonalizado ? 'Código Personalizado' : 'Código Automático';
    if (!this.usarCodigoPersonalizado) {
      // Si se está cambiando a usar el código automático, limpiar el valor del código personalizado
      this.codigoPersonalizado = '';
    }
  }
  
  

    // Atributo tipo que usamos para actualizar
  expedientesParaActualizar: Expedientes | null = null;


  actualizarExpedientesFormulario(): void {
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
    this.loading = true;
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
      this.loading = true;
      if (confirm('¿Estás seguro de querer borrar este expediente?')) {
        this.servicio.borrarExpedientes(id).subscribe(
          () => {
            this.mensaje = 'Expediente borrado';
            this.snackBar.open('Expediente borrado correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.cargarExpedientesBorrados();
            this.cargarExpedientes();
          },
          (error) => {
            this.snackBar.open('Error al borrar el expediente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        );
      }
    }

    borradoLogicoExpedientes(id: number): void {
      if (confirm('¿Estás seguro de querer borrar lógicamente este expediente?')) {
        this.servicio.borradoLogicoExpedientes(id).subscribe(
          () => {
            this.mensaje = 'Documento borrado lógicamente';
            this.loading = true;
            this.snackBar.open('Documento borrado lógicamente correctamente', 'Cerrar', {
              duration: 5000, 
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.cargarExpedientesBorrados(); 
            this.cargarExpedientes(); 
          },
          (error) => {
            this.snackBar.open('Error al borrar lógicamente el expediente', 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        );
      }
    }


    recuperarExpedientes(id: number): void {
      this.servicio.recuperarExpedientes(id).subscribe(() => {
          this.snackBar.open('Expedientes recuperado correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
          });
          this.loading = true;
          this.cargarExpedientesBorrados();
          this.cargarExpedientes();
      });
    }

    filtrarExpedientes(searchTerm: string = ''): void {
      if (!searchTerm.trim()) {
        // Si no hay término de búsqueda, mostrar todos los tipos
        this.expedientesFiltrados = this.expedientes;
      } else {
        // Filtrar los tipos según el término de búsqueda
        this.expedientesFiltrados = this.expedientes.filter(expediente =>
          expediente.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expediente.estado.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
}
