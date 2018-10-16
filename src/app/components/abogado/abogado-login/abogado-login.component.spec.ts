import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoLoginComponent } from './abogado-login.component';

describe('AbogadoLoginComponent', () => {
  let component: AbogadoLoginComponent;
  let fixture: ComponentFixture<AbogadoLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
