import { ConversationCreateModel } from './../../../share/models/conversation.model';
import { ConversationService } from './../../../share/services/conversition/conversation.service';
import { AddMemberModalComponent } from './../../../share/ui/add-member-modal/add-member-modal.component';
import { ContentChatComponent } from './../../../share/ui/content-chat/content-chat.component';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversationModel } from 'src/app/share/models/conversation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.scss']
})
export class SidebarChatComponent implements OnInit, AfterViewInit{
  @Input() listConversations: any;
  @Input() listFriend: any;
  @Output() newItemEvent = new EventEmitter<ConversationCreateModel>();
  constructor(private modalService: NgbModal,
              private conversationService: ConversationService) { }

  ngAfterViewInit(): void {
      if(this.listConversations) {
        console.log('this.listConversations', this.listConversations);
      }
  }

  ngOnInit(): void {

  }

  openModalAddMember($event: any): void{
    console.log('openModalAddMember', $event);
    const modalRef = this.modalService.open(AddMemberModalComponent , {
      size: 'lg'
    })
    modalRef.componentInstance.listFriend = this.listFriend;
    modalRef.result.then((result) => {
      this.newItemEvent.emit(result);

      // this.conversationService.createConversation(result).subscribe((conversation: ConversationModel) => {
      //   console.log('conversation', conversation);
      // })
      console.log('result', result);
    })
  }
}
