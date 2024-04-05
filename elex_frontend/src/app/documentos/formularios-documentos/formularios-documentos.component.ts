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
  loading: boolean = false;
  contadorDocumentos: number = 1;

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
    this.loading = true;
    this.servicio.consultarDocumentos().subscribe(datos => {
      this.documentos = datos;
      this.filtrarDocumentos(this.searchTerm);
      this.loading = false; 
    });
  }

  cargarDocumentosBorrados(): void {
    this.loading = true; 
    this.servicio.consultarDocumentosBorrados().subscribe(datos => {
      this.documentosBorrados = datos;
    });
  }

  cargarExpedientes(): void {
    this.loading = true;
    this.servicio.consultarExpedientes().subscribe(expedientes => {
      this.expedientes = expedientes;
    });
  }

  insertarDocumentos(): void {
    this.loading = true;
    const rutaGenerada = this.generarRuta(); // Genera la ruta automáticamente
    this.servicio.insertarDocumentos(rutaGenerada, this.tasa, this.expedienteId).subscribe(
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

  generarRuta(): string {
    const rutaBase = 'ruta-pdf';
    const numeroDocumento = this.contadorDocumentos.toString().padStart(3, '0'); // Asegura que el número tenga tres dígitos (por ejemplo, 001, 002, etc.)
    this.contadorDocumentos++; // Incrementa el contador para el próximo documento
    return rutaBase + numeroDocumento;
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
    this.loading = true;
    this.documentosParaActualizar = null;
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.loading = true;
    this.ruta = '';
    this.tasa = 0;
    this.expedienteId = 0;
  }
  borrarDocumentos(id: number): void {
    this.loading = true;
    if (confirm('¿Estás seguro de querer borrar este documento?')) {
      this.servicio.borrarDocumentos(id).subscribe(
        () => {
          this.mensaje = 'Documento borrado';
          this.snackBar.open('Documento borrado correctamente', 'Cerrar', {
            duration: 5000, 
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.cargarDocumentosBorrados();
          this.cargarDocumentos();
        },
        (error) => {
          this.snackBar.open('Error al borrar el documento', 'Cerrar', {
            duration: 5000,
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
          this.loading = true;
          this.snackBar.open('Documento borrado lógicamente correctamente', 'Cerrar', {
            duration: 5000, // Duración extendida a 5 segundos
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.cargarDocumentosBorrados(); 
          this.cargarDocumentos(); 
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

  recuperarDocumentos(id: number): void {
    this.servicio.recuperarDocumentos(id).subscribe(() => {
        this.snackBar.open('Documento recuperado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
        this.loading = true;
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
