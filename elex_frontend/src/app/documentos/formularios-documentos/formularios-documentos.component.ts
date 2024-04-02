import { Component, OnInit } from '@angular/core';
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

  constructor(private servicio: DocumentosService) {}

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
    this.servicio.insertarDocumentos(this.ruta, this.tasa, this.expedienteId).subscribe(resultado => {
      if (resultado) {
        this.mensaje = "Documento Insertado";
        this.cargarDocumentos();
      }
    });
  }

  cargarExpedientes(): void {
    this.servicio.consultarExpedientes().subscribe(expedientes => {
      this.expedientes = expedientes;
    });
  }
}
