import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatientPage } from './add-edit-patient.page';

describe('AddEditPatientPage', () => {
  let component: AddEditPatientPage;
  let fixture: ComponentFixture<AddEditPatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPatientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
