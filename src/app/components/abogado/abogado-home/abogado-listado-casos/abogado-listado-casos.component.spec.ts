import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoListadoCasosComponent } from './abogado-listado-casos.component';

describe('AbogadoListadoCasosComponent', () => {
  let component: AbogadoListadoCasosComponent;
  let fixture: ComponentFixture<AbogadoListadoCasosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoListadoCasosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoListadoCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
