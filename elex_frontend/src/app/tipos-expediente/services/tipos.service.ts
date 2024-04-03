import { Injectable } from '@angular/core';

// Importaciones adicionales propios
import { Tipos } from '../models/tipos.model';
import { environment } from '../../../environments/environment.development';

// Importaciones adicionales de librerias Angular
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiposService {
  // Atributo con la raiz de los endpoints
  private baseURL = `${environment.apiURL}/tipos_expediente`;

  // En el constructor inyecto el HttpClient para gestionar endpoints
  constructor(private http: HttpClient) {}

  // Insertar tipos
  // @PostMapping("/insertar/{materia}")
  insertarTipo(materia: string): Observable<Tipos> {
    const url = `${this.baseURL}/insertar/${materia}`;
    return this.http.post<Tipos>(url, {}); // {} body, siempre vacio
  }

  // Consultar tipos
  // @GetMapping("/consultar")

  consultarTipos(): Observable<Tipos[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Tipos[]>(url).pipe(
      // Filtrar los tipos de expediente donde el campo "borrado" sea falso (0)
      map(tipos => tipos.filter(tipo => tipo.borrado === false))
    );
  }


// Muestra toodos los datos
    consultarTiposBorrados(): Observable<Tipos[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Tipos[]>(url).pipe(
      // Filtrar los tipos de expediente donde el campo "borrado" sea falso (0)
      map(tiposBorrados => tiposBorrados.filter(tipo => tipo.borrado === true))
    );
  }




  // Actualizar tipos
  // @PutMapping("/actualizar/{id}/{materia}")
  actualizarTipo(id: number, materia: string): Observable<Tipos> {
    const url = `${this.baseURL}/actualizar/${id}/${materia}`;
    return this.http.put<Tipos>(url, {});
  }

  // Borrar tipos
  // @DeleteMapping("/borrar/{id}")
  borrarTipo(id: number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`;
    return this.http.delete<void>(url);
  }

  // Borrado Logico tipos
  // @PutMapping("/borrarLogico/{id}")
  borradoLogicoTipo(id: number): Observable<void> {
    const url = `${this.baseURL}/borrarLogico/${id}`;
    return this.http.put<void>(url, {});
  }

  // Recuperacion tipos
  // @PutMapping("/recuperarTipo/{id}")
  recuperarTipo(id: number): Observable<void> {
    const url = `${this.baseURL}/recuperarTipo/${id}`;
    return this.http.put<void>(url, {});
  }
}