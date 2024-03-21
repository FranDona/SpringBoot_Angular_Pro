// Spring + Angular: Paso2 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expedientes } from '../models/expedientes.model';


@Injectable({
  providedIn: 'root',
})
export class ExpedientesService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8101/expedientes/'

  // Método para agregar Expedientes
  // Endpoint Ejemplo: http://localhost:8101/expedientes/insertar/{codigo}/{fecha}/{estado}/{opciones}/{descripcion}/{tipo}
addExpediente(expediente: Expedientes) {
    const url = `${this.baseUrl}/insertar/${expediente.codigo}/${expediente.fecha}/${expediente.estado}/${expediente.opciones}/${expediente.descripcion}/${expediente.tipo}`;
    return this.http.post(url, {});
  }
}
