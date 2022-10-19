import { TestBed } from '@angular/core/testing';

import { ConversitionService } from './conversition.service';

describe('ConversitionService', () => {
  let service: ConversitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
