import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormulariosTiposComponent } from './tipos-expediente/formularios-tipos/formularios-tipos.component';
import { FormulariosExpedientesComponent } from './expedientes/formularios-expedientes/formularios-expedientes.component';
import { FormulariosDocumentosComponent } from './documentos/formularios-documentos/formularios-documentos.component';
import { FormulariosActuacionesComponent } from './actuaciones/formularios-actuaciones/formularios-actuaciones.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'tipos', component: FormulariosTiposComponent },
  { path: 'expedientes', component: FormulariosExpedientesComponent },
  { path: 'documentos', component: FormulariosDocumentosComponent },
  { path: 'actuaciones', component: FormulariosActuacionesComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // Redirige a /index cuando la ruta está vacía
  { path: '**', redirectTo: '/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
