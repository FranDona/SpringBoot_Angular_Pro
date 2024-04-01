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

  private getTipoNombre(idTipo: string): string {
    // Aquí deberías implementar la lógica para obtener el nombre del tipo de expediente a partir del ID,
    // ya sea mediante una consulta al backend o alguna otra fuente de datos
    // Por simplicidad, asumiremos que tienes una función o un mapeo predefinido para obtener el nombre
    return ''; // Esto es solo un placeholder, debes reemplazarlo con tu lógica real
  }
}