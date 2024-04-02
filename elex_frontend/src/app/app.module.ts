import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule o NoopAnimationsModule según tus necesidades

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    FormulariosActuacionesComponent,
    FormulariosDocumentosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Agrega BrowserAnimationsModule o NoopAnimationsModule aquí
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
