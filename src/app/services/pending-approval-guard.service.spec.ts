import { TestBed, inject } from '@angular/core/testing';

import { PendingApprovalGuardService } from './pending-approval-guard.service';

describe('PendingApprovalGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingApprovalGuardService]
    });
  });

  it('should be created', inject([PendingApprovalGuardService], (service: PendingApprovalGuardService) => {
    expect(service).toBeTruthy();
  }));
});
