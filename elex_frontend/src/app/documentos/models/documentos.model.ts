// ELEX: SpringBoot3.2 + Angular17.3 -> Paso2: Modelo (interfaz)
// Comando: ng generate class models/documentos --type=model

import { Expedientes } from "../../expedientes/models/expedientes.model";

export interface Documentos {
    id: number;
    ruta: string;
    tasa: number;
    expediente: Expedientes;
    borrado: boolean;
}
