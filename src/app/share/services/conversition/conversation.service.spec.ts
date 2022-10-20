import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { ConversationService } from './conversation.service';

describe('ConversitionService', () => {
  let service: ConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationService);
=======
import { ConversitionService } from './conversition.service';

describe('ConversitionService', () => {
  let service: ConversitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversitionService);
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
