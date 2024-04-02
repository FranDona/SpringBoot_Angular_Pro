import { Injectable } from '@angular/core';

// Importaciones adicionales propios
import { Expedientes } from '../models/expedientes.model';
import { environment } from '../../../environments/environment.development';

// Importaciones adicionales de librerias Angular
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipos } from '../../tipos-expediente/models/tipos.model';

@Injectable({
  providedIn: 'root',
})
export class ExpedientesService {
  // Atributo con la raiz de los endpoints
  private baseURL = `${environment.apiURL}/expedientes`;
  
  // En el constructor inyecto el HttpClient para gestionar endpoints
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
    return this.http.get<Expedientes[]>(url);
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
}
