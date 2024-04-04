import { Injectable } from '@angular/core';

// Importaicones propias
import { Documentos } from '../models/documentos.model';
import { environment } from '../../../environments/environment.development';
import { Expedientes } from '../../expedientes/models/expedientes.model';

// Importaciones adicionales de librerias Angular
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


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
    return this.http.get<Documentos[]>(url).pipe(
      // Filtrar los tipos de expediente donde el campo "borrado" sea falso (0)
      map(documentos => documentos.filter(documento => documento.borrado === false))
    );
  }

  // Muestra toodos los datos
  consultarDocumentosBorrados(): Observable<Documentos[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Documentos[]>(url).pipe(
      // Filtrar los tipos de expediente donde el campo "borrado" sea falso (0)
      map(tiposBorrados => tiposBorrados.filter(tipo => tipo.borrado === true))
    );
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

  // Borrado Logico documentos
  // @DeleteMapping("/borrarLogico/{id}")
  borradoLogicoDocumentos(id: number): Observable<void> {
    const url = `${this.baseURL}/borrarLogico/${id}`;
    return this.http.put<void>(url, {});
  }

  
  // Recuperacion documentos
  // @PutMapping("/recuperarDocumento/{id}")
  recuperarDocumentos(id: number): Observable<void> {
    const url = `${this.baseURL}/recuperarDocumentos/${id}`;
    return this.http.put<void>(url, {});
  }

  // Consulta general con todos los datos
  //consultarDocumentos(): Observable<Documentos[]> {
  //  const url = `${this.baseURL}/consultar`;
  //  return this.http.get<Documentos[]>(url);
  //}


}
