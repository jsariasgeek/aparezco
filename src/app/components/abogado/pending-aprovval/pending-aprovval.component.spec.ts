import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAprovvalComponent } from './pending-aprovval.component';

describe('PendingAprovvalComponent', () => {
  let component: PendingAprovvalComponent;
  let fixture: ComponentFixture<PendingAprovvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAprovvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAprovvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
