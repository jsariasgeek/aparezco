import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoRootComponent } from './abogado-root.component';

describe('AbogadoRootComponent', () => {
  let component: AbogadoRootComponent;
  let fixture: ComponentFixture<AbogadoRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
