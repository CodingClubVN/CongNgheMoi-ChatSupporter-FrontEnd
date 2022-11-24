import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-name-conversation-modal',
  templateUrl: './edit-name-conversation-modal.component.html',
  styleUrls: ['./edit-name-conversation-modal.component.scss']
})
export class EditNameConversationModalComponent implements OnInit {
  @Input('conversatinSelect') conversatinSelect!: any | null;
  conversationNameForm: any;
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.conversationNameForm = this.initConversationNameForm();
  }
  initConversationNameForm(): FormGroup {
    return new FormGroup({
      conversationName: new FormControl(this.conversatinSelect.conversationName, [Validators.required])
    });
  }
  close(event: any): void {
    this.modal.close();
  }

  submit(event: any): void {
    this.modal.close(this.conversationNameForm.value);
  }
}
