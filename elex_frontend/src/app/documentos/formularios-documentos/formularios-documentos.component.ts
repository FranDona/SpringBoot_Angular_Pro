import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; // Importa los operadores de RxJS
import { DocumentosService } from '../services/documentos.service';
import { Documentos } from '../models/documentos.model';
import { Expedientes } from '../../expedientes/models/expedientes.model';

@Component({
  selector: 'app-formularios-documentos',
  templateUrl: './formularios-documentos.component.html',
  styleUrls: ['./formularios-documentos.component.css']
})
export class FormulariosDocumentosComponent implements OnInit {
  documentos: Documentos[] = [];
  documentosBorrados: Documentos[] = [];
  documentosFiltrados: Documentos[] = [];
  mensaje: string = '';
  expedientes: Expedientes[] = [];
  ruta: string = '';
  tasa: number = 0;
  rutaActualizar = "";
  tasaActualizar = 0;
  expedienteId: number = 0;
  documentosParaActualizar: Documentos | null = null;
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';

  constructor(private servicio: DocumentosService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarDocumentos();
    this.cargarExpedientes();
    this.cargarDocumentosBorrados();
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.filtrarDocumentos(value);
    });
  }

  cargarDocumentos(): void {
    this.servicio.consultarDocumentos().subscribe(datos => {
      this.documentos = datos;
      this.filtrarDocumentos(this.searchTerm);
    });
  }

  cargarDocumentosBorrados(): void {
    this.servicio.consultarDocumentosBorrados().subscribe(datos => {
      this.documentosBorrados = datos;
    });
  }

  cargarExpedientes(): void {
    this.servicio.consultarExpedientes().subscribe(expedientes => {
      this.expedientes = expedientes;
    });
  }

  insertarDocumentos(): void {
    this.servicio.insertarDocumentos(this.ruta, this.tasa, this.expedienteId).subscribe(
      () => {
        this.mensaje = 'Documento Insertado';
        this.cargarDocumentos();
      },
      (error) => {
        console.error('Error al insertar el documento:', error);
        this.snackBar.open('Error al insertar el documento', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }



  actualizarDocumentosFormulario(): void {
    if (this.documentosParaActualizar && this.rutaActualizar && this.tasaActualizar) {
      this.servicio.actualizarDocumentos(this.documentosParaActualizar.id, this.rutaActualizar, this.tasaActualizar).subscribe(
        () => {
          this.mensaje = 'Documento actualizado';
          this.cargarDocumentos();
          this.documentosParaActualizar = null;
          this.resetFormulario();
          this.rutaActualizar = "";
          this.tasaActualizar = 0;
        },
        (error) => {
          console.error('Error al actualizar el documento:', error);
          this.snackBar.open('Error al actualizar el documento', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      );
    }
  }


 

  prepararActualizacion(documento: Documentos): void {
    this.documentosParaActualizar = documento;
    this.rutaActualizar = documento.ruta;
    this.tasaActualizar = documento.tasa;
  }

  cancelarActualizacion(): void {
    this.documentosParaActualizar = null;
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.ruta = '';
    this.tasa = 0;
    this.expedienteId = 0;
  }
  borrarDocumentos(id: number): void {
    if (confirm('¿Estás seguro de querer borrar este documento?')) {
      this.servicio.borrarDocumentos(id).subscribe(
        () => {
          this.mensaje = 'Documento borrado';
          this.snackBar.open('Documento borrado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.cargarDocumentosBorrados();
          this.cargarDocumentos();
        },
        (error) => {
          this.snackBar.open('Error al borrar el documento', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      );
    }
  }

  borradoLogicoDocumentos(id: number): void {
    if (confirm('¿Estás seguro de querer borrar lógicamente este documento?')) {
      this.servicio.borradoLogicoDocumentos(id).subscribe(
        () => {
          this.mensaje = 'Documento borrado lógicamente';
          this.cargarDocumentosBorrados(); // Cambio aquí
          this.cargarDocumentos(); // También puedes cargar la lista de documentos si es necesario
        },
        (error) => {
          console.error('Error al borrar lógicamente el documento:', error);
          this.snackBar.open('Error al borrar lógicamente el documento', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      );
    }
  }

  recuperarDocumentos(id: number): void {
    this.servicio.recuperarDocumentos(id).subscribe(() => {
        this.snackBar.open('Documento recuperado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
        this.cargarDocumentosBorrados();
        this.cargarDocumentos();
    });
  }


  filtrarDocumentos(searchTerm: string = ''): void {
    if (!searchTerm.trim()) {
      // Si no hay término de búsqueda, mostrar todos los tipos
      this.documentosFiltrados = this.documentos;
    } else {
      // Filtrar los tipos según el término de búsqueda
      this.documentosFiltrados = this.documentos.filter(documento =>
        documento.expediente.codigo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  
}
