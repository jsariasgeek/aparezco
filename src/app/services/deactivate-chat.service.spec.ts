import { TestBed, inject } from '@angular/core/testing';

import { DeactivateChatService } from './deactivate-chat.service';

describe('DeactivateChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeactivateChatService]
    });
  });

  it('should be created', inject([DeactivateChatService], (service: DeactivateChatService) => {
    expect(service).toBeTruthy();
  }));
});
