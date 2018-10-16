import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoActividadesComponent } from './abogado-actividades.component';

describe('AbogadoActividadesComponent', () => {
  let component: AbogadoActividadesComponent;
  let fixture: ComponentFixture<AbogadoActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
