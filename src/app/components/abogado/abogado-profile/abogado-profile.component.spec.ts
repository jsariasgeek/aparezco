import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoProfileComponent } from './abogado-profile.component';

describe('AbogadoProfileComponent', () => {
  let component: AbogadoProfileComponent;
  let fixture: ComponentFixture<AbogadoProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
