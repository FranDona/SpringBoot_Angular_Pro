import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosExpedientesComponent } from './formularios-expedientes.component';

describe('FormulariosExpedientesComponent', () => {
  let component: FormulariosExpedientesComponent;
  let fixture: ComponentFixture<FormulariosExpedientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulariosExpedientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulariosExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
