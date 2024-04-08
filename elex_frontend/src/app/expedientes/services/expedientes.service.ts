import { Injectable } from '@angular/core';

// Importaciones adicionales propios
import { Expedientes } from '../models/expedientes.model';
import { environment } from '../../../environments/environment.development';

// Importaciones adicionales de librerias Angular
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tipos } from '../../tipos-expediente/models/tipos.model';

@Injectable({
  providedIn: 'root',
})
export class ExpedientesService {
  private baseURL = `${environment.apiURL}/expedientes`;
  constructor(private http: HttpClient) {}

  // Insertar expedientes
  // @PostMapping("/insertar/{codigo}/{fecha}/{estado}/{opciones}/{descripcion}/{tipoId}")
  insertarExpedientes(codigo: string, fecha: string, estado: string, opciones: string, descripcion: string, tipoId:number): Observable<Expedientes> {
    const url = `${this.baseURL}/insertar/${codigo}/${fecha}/${estado}/${opciones}/${descripcion}/${tipoId}`;
    return this.http.post<Expedientes>(url, {});
  }

  // Consultar expedientes
  // @GetMapping("/consultar")
  consultarExpedientes(): Observable<Expedientes[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Expedientes[]>(url).pipe(
      // Filtrar los tipos de expediente donde el campo "borrado" sea falso (0)
      map(expedientes => expedientes.filter(expediente => expediente.borrado === false))
    );
  }
  
  consultarExpedientesBorrados(): Observable<Expedientes[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Expedientes[]>(url).pipe(
      // Filtrar los tipos de expediente donde el campo "borrado" sea verdadero (1)
      map(expedientesBorrados => expedientesBorrados.filter(expediente => expediente.borrado === true))
    );
  }

  // Consultar entidad TiposExpedientes
  consultarTipos(): Observable<Tipos[]> {
    const url = `${environment.apiURL}/tipos_expediente/consultar`; 
    return this.http.get<Tipos[]>(url);
  }
  
  // Actualizar expedientes
  // @PutMapping("/actualizar/{id}/{codigo}/{fecha}/{estado}/{opciones}/{descripcion}/{tipoId}")
  actualizarExpedientes(id: number, codigo: string, fecha: string, estado: string, opciones: string, descripcion: string, tipoId:number): Observable<Expedientes> {
    const url = `${this.baseURL}/actualizar/${id}/${codigo}/${fecha}/${estado}/${opciones}/${descripcion}/${tipoId}`;
    return this.http.put<Expedientes>(url, {});
  }

  // Borrar expedientes
  // @DeleteMapping("/borrar/{id}")
  borrarExpedientes(id: number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`;
    return this.http.delete<void>(url);
  }

  // Borrado Logico expedientes
  // @DeleteMapping("/borrarLogico/{id}")
  borradoLogicoExpedientes(id: number): Observable<void> {
    const url = `${this.baseURL}/borrarLogico/${id}`;
    return this.http.put<void>(url, {});
  }

  // Recuperado de expedientes
  // @DPutMapping("/recuperarExpedientes/{id}")
  recuperarExpedientes(id: number): Observable<void> {
    const url = `${this.baseURL}/recuperarExpedientes/${id}`;
    return this.http.put<void>(url, {});
  }
}
