import { Expedientes } from "../../expedientes/models/expedientes.model";

export interface Documentos {
    id: number;
    ruta: string;
    tasa: number;
    expediente: Expedientes;
    borrado: boolean;
}
