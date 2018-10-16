import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRegistroDirectComponent } from './usuario-registro-direct.component';

describe('UsuarioRegistroDirectComponent', () => {
  let component: UsuarioRegistroDirectComponent;
  let fixture: ComponentFixture<UsuarioRegistroDirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRegistroDirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRegistroDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
