// ELEX: SpringBoot3.2 + Angular17.3 -> Paso3: Servicio
// Comando: ng generate service services/documentos

import { Injectable } from '@angular/core';

// Importaicones propias
import { Documentos } from '../models/documentos.model';
import { environment } from '../../../environments/environment.development';
import { Expedientes } from '../../expedientes/models/expedientes.model';

// Importaciones adicionales de librerias Angular
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  // Atributo con la raiz de los endpoints
  private baseURL = `${environment.apiURL}/documentos`;

  // En el constructor inyecto el HttpClient para gestionar endpoints
  constructor(private http: HttpClient) {}

  // Insertar documentos
  // @PostMapping("/insertar/{ruta}/{tasa}/{expedienteId}")
  insertarDocumentos(ruta: string, tasa: number, expedienteId: number): Observable<Documentos> {
    const url = `${this.baseURL}/insertar/${ruta}/${tasa}/${expedienteId}`;
    return this.http.post<Documentos>(url, {});
  }

  // Consultar documentos
  // @GetMapping("/consultar")
  consultarDocumentos(): Observable<Documentos[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Documentos[]>(url);
  }
  //Consultar entidad Expedientes
  consultarExpedientes(): Observable<Expedientes[]> {
    const url = `${environment.apiURL}/expedientes/consultar`; 
    return this.http.get<Expedientes[]>(url);
  }

  // Actualizar documentos
  // @PutMapping("/actualizar/{id}/{ruta}/{tasa}")
  actualizarDocumentos(id: number, ruta: string, tasa: number): Observable<Documentos> {
    const url = `${this.baseURL}/actualizar/${id}/${ruta}/${tasa}`;
    return this.http.put<Documentos>(url, {});
  }

  // Borrar documentos
  // @DeleteMapping("/borrar/{id}")
  borrarDocumentos(id: number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`;
    return this.http.delete<void>(url);
  }





}
