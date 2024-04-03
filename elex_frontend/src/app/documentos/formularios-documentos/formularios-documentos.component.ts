import { Component, OnInit } from '@angular/core';

// Importacion de Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

import { DocumentosService } from '../services/documentos.service';
import { Documentos } from '../models/documentos.model';
import { Expedientes } from '../../expedientes/models/expedientes.model';

@Component({
  selector: 'app-formularios-documentos',
  templateUrl: './formularios-documentos.component.html',
  styleUrls: ['./formularios-documentos.component.css'] // El nombre de la propiedad es styleUrls, no styleUrl
})
export class FormulariosDocumentosComponent implements OnInit {
  documentos: Documentos[] = [];
  mensaje: string = "";
  expedientes: Expedientes[] = []; // Añadimos un arreglo para almacenar los expedientes

  ruta: string = "---";
  tasa: number = 0;
  expedienteId: number = 0;

  // Inyectar "private snackBar: MatSnackBar para Angular Material
  constructor(private servicio: DocumentosService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarDocumentos();
    this.cargarExpedientes(); // Llamamos al método para cargar expedientes en el ngOnInit
  }

  cargarDocumentos(): void {
    this.servicio.consultarDocumentos().subscribe(datos => {
      this.documentos = datos;
    });
  }

  insertarDocumentos(): void {
    this.servicio.insertarDocumentos(this.ruta, this.tasa, this.expedienteId).subscribe(
      resultado => {
        if (resultado) {
          this.mensaje = "Documento Insertado";
          this.cargarDocumentos();
        }
      },
      // Mensaje de Angular Material en caso de error
      error => {
        this.snackBar.open('Error al insertar el documento', 'Cerrar', {
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
  documentosParaActualizar: Documentos | null = null;


  actualizarDocumentos(): void {
    if (this.documentosParaActualizar && this.ruta && this.tasa) {
      this.servicio.actualizarDocumentos(this.documentosParaActualizar.id, this.ruta, this.tasa).subscribe(resultado => {
        this.mensaje = "Documento actualizado";
        this.cargarDocumentos();
        this.documentosParaActualizar = null;
        this.ruta = "---";
        this.tasa = 0;
      })
    }
  }

  prepararActualizacion(documento: Documentos): void {
    this.documentosParaActualizar = documento;
    this.ruta = documento.ruta;
    this.tasa = documento.tasa;
  }

  cancelarActualizacion(): void {
    this.documentosParaActualizar = null;
    this.ruta = "---";
    this.tasa = 0;
  }

    // Y el borrado...
    borrarDocumentos(id: number): void {
      if (confirm("¿Estás seguro de querer borrar este tipo?")) {
        this.servicio.borrarDocumentos(id).subscribe(() => {
          this.mensaje = "Documento borrado";
          this.cargarDocumentos();
        });
      }
    }

    borradoLogicoDocumentos(id: number): void {
      if (confirm("¿Estás seguro de querer borrar lógicamente este documento?")) {
        this.servicio.borradoLogicoDocumentos(id).subscribe(
          () => {
            this.mensaje = "Documento borrado lógicamente";
            this.cargarDocumentos();
          },
          (error) => {
            console.error("Error al intentar borrar lógicamente el documento:", error);
            // Aquí puedes manejar el error como desees, por ejemplo, mostrando un mensaje de error
            this.snackBar.open('Error al borrar el documento', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
    }
    
    

}
