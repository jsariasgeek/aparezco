import { TestBed, inject } from '@angular/core/testing';

import { LawerOrUserGuardService } from './lawer-or-user-guard.service';

describe('LawerOrUserGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LawerOrUserGuardService]
    });
  });

  it('should be created', inject([LawerOrUserGuardService], (service: LawerOrUserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
