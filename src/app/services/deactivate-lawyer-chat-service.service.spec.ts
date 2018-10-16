import { TestBed, inject } from '@angular/core/testing';

import { DeactivateLawyerChatServiceService } from './deactivate-lawyer-chat-service.service';

describe('DeactivateLawyerChatServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeactivateLawyerChatServiceService]
    });
  });

  it('should be created', inject([DeactivateLawyerChatServiceService], (service: DeactivateLawyerChatServiceService) => {
    expect(service).toBeTruthy();
  }));
});
