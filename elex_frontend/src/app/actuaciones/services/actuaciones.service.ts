import { Injectable } from '@angular/core';

// Importaicones propias
import { Actuaciones } from '../models/actuaciones.model';
import { environment } from '../../../environments/environment.development';
import { Expedientes } from '../../expedientes/models/expedientes.model';

// Importaciones adicionales de librerias Angular
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActuacionesService {
  // Atributo con la raiz de los endpoints
  private baseURL = `${environment.apiURL}/actuaciones`;

  // En el constructor inyecto el HttpClient para gestionar endpoints
  constructor(private http: HttpClient) {}

  // Insertar actuaciones
  // @PostMapping("/insertar/{ruta}/{tasa}/{expedienteId}")
  insertarActuaciones(descripcion: string, finalizado: boolean, fecha: string, expedienteId: number): Observable<Actuaciones> {
    const url = `${this.baseURL}/insertar/${descripcion}/${finalizado}/${fecha}/${expedienteId}`;
    return this.http.post<Actuaciones>(url, {});
  }
  // Consultar actuaciones
  // @GetMapping("/consultar")
  consultarActuaciones(): Observable<Actuaciones[]> {
    const url = `${this.baseURL}/consultar`;
    return this.http.get<Actuaciones[]>(url).pipe(
      // Filtrar los tipos de expediente donde el campo "borrado" sea falso (0)
      map(actuaciones => actuaciones.filter(actuacion => actuacion.borrado === false))
    );
  }
    // Muestra toodos los datos
    consultarActuacionesBorradas(): Observable<Actuaciones[]> {
      const url = `${this.baseURL}/consultar`;
      return this.http.get<Actuaciones[]>(url).pipe(
        // Filtrar los tipos de expediente donde el campo "borrado" sea falso (0)
        map(actuacionesBorradas => actuacionesBorradas.filter(actuacion => actuacion.borrado === true))
      );
    }
  //Consultar entidad Expedientes
  consultarExpedientes(): Observable<Expedientes[]> {
    const url = `${environment.apiURL}/expedientes/consultar`; 
    return this.http.get<Expedientes[]>(url);
  }

  // Actualizar actuaciones
  // @PutMapping("/actualizar/{id}/{rufinalizado}/{fecha}")
  actualizarActuaciones(id: number, descripcion: string, finalizado: boolean, fecha: string): Observable<Actuaciones> {
    const url = `${this.baseURL}/actualizar/${id}/${descripcion}/${finalizado}/${fecha}`;
    return this.http.put<Actuaciones>(url, {});
  }
  

  // Borrar actuaciones
  // @DeleteMapping("/borrar/{id}")
  borrarActuaciones(id: number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`;
    return this.http.delete<void>(url);
  }

  // Borrado Logico actuaciones
  // @DeleteMapping("/borrarLogico/{id}")
  borradoLogicoActuaciones(id: number): Observable<void> {
    const url = `${this.baseURL}/borrarLogico/${id}`;
    return this.http.put<void>(url, {});
  }


  // Recuperacion actuaciones
  // @PutMapping("/recuperarActuaciones/{id}")
  recuperarActuaciones(id: number): Observable<void> {
    const url = `${this.baseURL}/recuperarActuacion/${id}`;
    return this.http.put<void>(url, {});
  }
  
}