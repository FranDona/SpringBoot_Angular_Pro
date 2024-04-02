import { Expedientes } from "../../expedientes/models/expedientes.model";

export interface Actuaciones {
    id: number;
    descripcion: string;
    finalizado?: boolean;
    fecha: string;
    expediente: Expedientes;
    borrado: boolean;
}
