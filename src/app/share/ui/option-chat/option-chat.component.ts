import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { ConversationState } from './../../state/conversation.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversationModel } from '../../models/conversation.model';
import { AddMemberModalComponent } from '../modal/add-member-modal/add-member-modal.component';
import { ConversationService } from '../../services/conversition/conversation.service';

@Component({
  selector: 'app-option-chat',
  templateUrl: './option-chat.component.html',
  styleUrls: ['./option-chat.component.scss']
})
export class OptionChatComponent implements OnInit {
  @Input('conversatinSelect') conversatinSelect!: any | null;
  @Input() listFriend: any;
  @Output() newItemEvent = new EventEmitter<boolean>(false);
  conversation: any = null
  currentUser = this.tokenStorageService.getUser();
  constructor(private modalService: NgbModal,
    private conversationService: ConversationService,
    private conversationState: ConversationState,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.conversationState.$conversation.subscribe((conversation: any) => {
      this.conversationService.getConversationById(conversation?._id).subscribe(res => {
        this.conversation = res;
        this.conversatinSelect = res;
      })
    })
  }

  reloadData(id: string) {
    this.conversationService.getConversationById(id).subscribe(res => {
      this.conversationState.setConversation(res);
    });
  }

  openModal(event: any) {
    const modalRef = this.modalService.open(AddMemberModalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.listFriend = this.listFriend;
    modalRef.componentInstance.action = 'add-member';
    modalRef.componentInstance.conversation = this.conversation;
    modalRef.result.then((result) => {
      this.conversationService.addMemberToConversation(this.conversation._id, result.arrayUserId).subscribe(res => {
        this.reloadData(this.conversation._id);
      })
    })
  }
  removeMember(user: any) {
    this.conversationService.removeMenberFromConversation(this.conversation._id, user._id).subscribe(() => {
      this.reloadData(this.conversation._id);
    })
  }

  outConversation(event: any): void {
    this.conversationService.deleteConversation(this.conversatinSelect._id).subscribe((res: any) => {
      this.conversationState.deleteConversationStatus(true);
    })
  }
}
