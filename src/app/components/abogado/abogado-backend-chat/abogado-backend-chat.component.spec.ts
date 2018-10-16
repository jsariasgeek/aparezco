import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoBackendChatComponent } from './abogado-backend-chat.component';

describe('AbogadoBackendChatComponent', () => {
  let component: AbogadoBackendChatComponent;
  let fixture: ComponentFixture<AbogadoBackendChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoBackendChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoBackendChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
