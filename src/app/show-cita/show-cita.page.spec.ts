import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCitaPage } from './show-cita.page';

describe('ShowCitaPage', () => {
  let component: ShowCitaPage;
  let fixture: ComponentFixture<ShowCitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
