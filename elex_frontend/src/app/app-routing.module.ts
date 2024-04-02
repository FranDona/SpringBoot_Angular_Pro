import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormulariosTiposComponent } from './tipos-expediente/formularios-tipos/formularios-tipos.component';
import { FormulariosExpedientesComponent } from './expedientes/formularios-expedientes/formularios-expedientes.component';
import { FormulariosDocumentosComponent } from './documentos/formularios-documentos/formularios-documentos.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'tipos', component: FormulariosTiposComponent },
  { path: 'expedientes', component: FormulariosExpedientesComponent },
  { path: 'documentos', component: FormulariosDocumentosComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
