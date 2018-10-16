import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoDetalleCasoComponent } from './abogado-detalle-caso.component';

describe('AbogadoDetalleCasoComponent', () => {
  let component: AbogadoDetalleCasoComponent;
  let fixture: ComponentFixture<AbogadoDetalleCasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoDetalleCasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoDetalleCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
