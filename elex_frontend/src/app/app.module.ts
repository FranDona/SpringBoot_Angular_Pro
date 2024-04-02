//ELEX: SpringBoot3.2 + Angular17.3 -> Paso5: Controlador componente GENERAL

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



// Hay que añadir estos componentes de Librerias Angular
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IndexComponent } from './index/index.component';

import { FormulariosExpedientesComponent } from './expedientes/formularios-expedientes/formularios-expedientes.component';
import { FormulariosTiposComponent } from './tipos-expediente/formularios-tipos/formularios-tipos.component'; 
import { FormulariosActuacionesComponent } from './actuaciones/formularios-actuaciones/formularios-actuaciones.component';
import { FormulariosDocumentosComponent } from './documentos/formularios-documentos/formularios-documentos.component';


@NgModule({
  declarations: [
    AppComponent,
    FormulariosTiposComponent,
    IndexComponent,
    FormulariosExpedientesComponent,
    FormulariosTiposComponent,
    FormulariosActuacionesComponent,
    FormulariosDocumentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Añadimos el HttpClient y el Forms
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }