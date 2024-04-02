import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Expedientes } from '../models/expedientes.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ExpedientesService {
  private baseURL = `${environment.apiURL}/expedientes`;

  constructor(private http: HttpClient) {}

  insertarExpediente(expedienteData: Expedientes): Observable<Expedientes> {
    expedienteData.tipo = this.getTipoNombre(expedienteData.tipo);
    const url = `${this.baseURL}/insertar`;
    return this.http.post<Expedientes>(url, expedienteData);
  }

  consultarExpedientes(): Observable<Expedientes[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Expedientes[]>(url);
  }

  actualizarExpediente(id: number, expedienteData: Expedientes): Observable<Expedientes> {
    expedienteData.tipo = this.getTipoNombre(expedienteData.tipo);
    const url = `${this.baseURL}/actualizar/${id}`;
    return this.http.put<Expedientes>(url, expedienteData);
  }

  borrarExpediente(id: number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`;
    return this.http.delete<void>(url);
  }

  public getTipoNombre(idTipo: string): string {
    const tiposExpediente: { [key: string]: string } = {
      '1': 'Judicial',
      '2': 'Militar',
      '3': 'Materia3',
      // Agrega más tipos según sea necesario
    };
  
    return tiposExpediente[idTipo] || '';
  }

  consultarTiposExpedientes(): Observable<string[]> {
    const url = `${this.baseURL}/tipos`; // Suponiendo que hay un endpoint en el backend para obtener los tipos de expedientes
    return this.http.get<string[]>(url);
  }
  
}
