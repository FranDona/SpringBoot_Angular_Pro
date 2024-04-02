import { Tipos } from "../../tipos-expediente/models/tipos.model";

export interface Expedientes {
  id: number;
  codigo: string;
  fecha: string; 
  estado: 'Pendiente' | 'Enviado' | 'Erróneo';
  opciones: string;
  descripcion: string;
  tipo: Tipos; 
  borrado: boolean;
  fecha_creacion: string; 
}
