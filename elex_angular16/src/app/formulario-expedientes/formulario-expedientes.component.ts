import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm si lo estás utilizando en tu componente
import { ExpedientesService } from '../services/expedientes.service'; // Asegúrate de importar ExpedientesService desde la ruta correcta

@Component({
  selector: 'app-formulario-expedientes',
  templateUrl: './formulario-expedientes.component.html',
  styleUrls: ['./formulario-expedientes.component.css']
})
export class FormularioExpedientesComponent {
  constructor(private expedientesService: ExpedientesService) {}

  onAddExpediente(form: NgForm) { 
    if (form.invalid) {
      return;
    }
    this.expedientesService.addExpediente(form.value).subscribe(() => {
      console.log('Expediente añadido correctamente');
    });

    // Una vez enviado el formulario, lo reseteamos para presentarlo de nuevo vacío
    form.resetForm(); 
  }
}
