import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoChatComponent } from './abogado-chat.component';

describe('AbogadoChatComponent', () => {
  let component: AbogadoChatComponent;
  let fixture: ComponentFixture<AbogadoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
