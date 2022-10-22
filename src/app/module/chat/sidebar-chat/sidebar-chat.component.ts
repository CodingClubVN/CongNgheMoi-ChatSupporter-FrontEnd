import { SocketIoService } from './../../../share/services/socketio/socket-io.service';
import { ConversationState } from './../../../share/state/conversation.state';
import { ConversationCreateModel } from './../../../share/models/conversation.model';
import { ConversationService } from './../../../share/services/conversition/conversation.service';
import { AddMemberModalComponent } from './../../../share/ui/add-member-modal/add-member-modal.component';
import { ContentChatComponent } from './../../../share/ui/content-chat/content-chat.component';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ConversationModel } from 'src/app/share/models/conversation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.scss']
})
export class SidebarChatComponent implements OnInit, OnChanges {
  @Input() listConversations: any;
  @Input() listFriend: any;
  @Output() newItemEvent = new EventEmitter<ConversationCreateModel>();
  constructor(private modalService: NgbModal,
    private conversationService: ConversationService,
    private conversationState: ConversationState,
    private socketIoService: SocketIoService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.listConversations) {
      this.selectConversation(this.listConversations[0]);
    }
    this.socketIoService.getConversation().subscribe((conversation: any) => {
      this.listConversations = this.listConversations.filter((res: any) => res._id !== conversation.conversation?._id);
      if (this.listConversations[0]._id !== conversation.conversation?._id) {
        this.listConversations.unshift(conversation.conversation);
      }
    });
  }

  ngOnInit(): void {
  }

  openModalAddMember($event: any): void {
    const modalRef = this.modalService.open(AddMemberModalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.listFriend = this.listFriend;
    modalRef.result.then((result) => {
      this.newItemEvent.emit(result);
    })
  }

  selectConversation(conversation: ConversationModel) {
    this.conversationState.setConversation(conversation);
    this.socketIoService.selectRoom(conversation?._id);
  }
}
