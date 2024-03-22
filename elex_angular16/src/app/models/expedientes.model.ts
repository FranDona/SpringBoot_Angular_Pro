export class Expedientes {
    constructor(
        public id: number = 0,
        public codigo: string = '',
        public fecha: Date = new Date(),
        public estado: string = '',
        public opciones: string = '',
        public descripcion: string = '',
        public tipo: number = 0,
        public borrado: boolean = false,
        public fecha_creacion: Date = new Date()
    ) {}
}
