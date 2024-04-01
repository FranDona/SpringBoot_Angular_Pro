export interface Expedientes {
  id: number;
  codigo: string;
  fecha: string; // Puedes usar un tipo de dato para fechas según tu preferencia
  estado: 'Pendiente' | 'Enviado' | 'Erróneo';
  opciones: string;
  descripcion: string;
  tipo: string; // Cambiamos el tipo de number a string
  borrado: boolean;
  fecha_creacion: string; // Puedes usar un tipo de dato para fechas según tu preferencia
}
