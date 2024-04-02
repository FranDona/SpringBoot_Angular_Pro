import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosActuacionesComponent } from './formularios-actuaciones.component';

describe('FormulariosActuacionesComponent', () => {
  let component: FormulariosActuacionesComponent;
  let fixture: ComponentFixture<FormulariosActuacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulariosActuacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulariosActuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
