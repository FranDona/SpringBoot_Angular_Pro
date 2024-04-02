// ELEX: SpringBoot3.2 + Angular17.3 -> Paso3: Servicio
// Comando: ng generate service services/documentos

import { Injectable } from '@angular/core';

// Importaciones adicionales propios
import { Documentos } from '../models/documentos.model';
import { environment } from '../../../environments/environment.development';

// Importaciones adicionales de librerias Angular
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expedientes } from '../../expedientes/models/expedientes.model';

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





  consultarExpedientes(): Observable<Expedientes[]> {
    const url = `${this.baseURL}/expedientes`;
    return this.http.get<Expedientes[]>(url);
  }

}
