import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoHomeComponent } from './abogado-home.component';

describe('AbogadoHomeComponent', () => {
  let component: AbogadoHomeComponent;
  let fixture: ComponentFixture<AbogadoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
