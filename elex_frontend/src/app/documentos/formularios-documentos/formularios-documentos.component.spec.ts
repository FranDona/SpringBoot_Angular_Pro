import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosDocumentosComponent } from './formularios-documentos.component';

describe('FormulariosDocumentosComponent', () => {
  let component: FormulariosDocumentosComponent;
  let fixture: ComponentFixture<FormulariosDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulariosDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulariosDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
