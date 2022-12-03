import { ConversationCreateModel } from './../../../models/conversation.model';
import { ConversationModel } from 'src/app/share/models/conversation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/share/models/user.model';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'src/app/share/services/notify/notifier.service';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit, OnChanges {
  @Input() listFriend: any[] = [];
  @Input() action!: string;
  @Input() conversation!: any;
  listUserIdSelected: string[] = [];
  formConversation = this.initForm();
  users!: any;
  constructor(private modal: NgbActiveModal,
    private notifierService: NotifierService) { }
  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    this.users = this.listFriend;
    console.log('this.listFriend', this.listFriend);
    if (this.action === 'add-member') {
      console.log('this.conversation', this.listFriend);
      this.listFriend = this.listFriend.filter(user => !this.conversation?.users.some((member: any) => member._id === user?.friend?._id));
    }
  }

  initForm(): FormGroup {
    return new FormGroup({
      conversationName: new FormControl('', [Validators.required]),
    });
  }
  searchUser(event: any): void {
    console.log('event', this.users);
    console.log('event', event.target.value);
    this.listFriend = this.users.filter((user: any) => user?.friend?.account?.username.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log('this.listFriend', this.listFriend);
  }

  getValueCheckbox(event: any) {
    if (event.target.checked) {
      this.listUserIdSelected.push(event.target.value);
    } else {
      this.listUserIdSelected = this.listUserIdSelected.filter(id => id !== event.target.value);
    }
  }

  onSubmit(event: any) {
    console.log('this.listUserIdSelected', this.listUserIdSelected);
    if (this.listUserIdSelected.length < 2 || this.conversation?.users.length > 2) {
      console.log('this.listUserIdSelected', this.listUserIdSelected);
      this.notifierService.warning('Please select at least 2 members', 'Warning');
      return;
    } else {
      const conversation = new ConversationCreateModel()
      conversation.conversationName = this.formConversation.value.conversationName ? this.formConversation.value.conversationName : 'Group no name';
      conversation.arrayUserId = this.listUserIdSelected;
      this.modal.close(conversation);
    }
  }
  close(event: any): void {
    this.modal.close();
  }

  isControlValid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(formGroup: FormGroup, validation: any, controlName: any): boolean {
    const control = formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(formGroup: FormGroup, controlName: any): boolean {
    const control = formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
