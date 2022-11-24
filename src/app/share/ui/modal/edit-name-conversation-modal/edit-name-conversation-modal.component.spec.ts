import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNameConversationModalComponent } from './edit-name-conversation-modal.component';

describe('EditNameConversationModalComponent', () => {
  let component: EditNameConversationModalComponent;
  let fixture: ComponentFixture<EditNameConversationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNameConversationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNameConversationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
