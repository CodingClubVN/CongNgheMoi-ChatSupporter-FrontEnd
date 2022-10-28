import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { ConversationModel } from '../../models/conversation.model';
import { AddMemberModalComponent } from '../modal/add-member-modal/add-member-modal.component';

@Component({
  selector: 'app-option-chat',
  templateUrl: './option-chat.component.html',
  styleUrls: ['./option-chat.component.scss']
})
export class OptionChatComponent implements OnInit {
  @Input('conversatinSelect') conversatinSelect!: ConversationModel | null;
  @Input() listFriend: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.conversatinSelect);
  }
  openModal(event: any) {
    const modalRef = this.modalService.open(AddMemberModalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.listFriend = this.listFriend;
    modalRef.result.then((result) => {
      // this.newItemEvent.emit(result);
    })
  }
}
