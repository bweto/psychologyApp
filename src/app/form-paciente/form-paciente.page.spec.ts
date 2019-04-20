import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPacientePage } from './form-paciente.page';

describe('FormPacientePage', () => {
  let component: FormPacientePage;
  let fixture: ComponentFixture<FormPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
