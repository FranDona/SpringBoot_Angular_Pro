import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioExpedientesComponent } from './formulario-expedientes.component';

describe('FormularioExpedientesComponent', () => {
  let component: FormularioExpedientesComponent;
  let fixture: ComponentFixture<FormularioExpedientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioExpedientesComponent]
    });
    fixture = TestBed.createComponent(FormularioExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
