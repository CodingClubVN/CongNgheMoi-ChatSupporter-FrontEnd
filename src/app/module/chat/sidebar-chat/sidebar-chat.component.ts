import { TokenStorageService } from './../../../share/services/token-storage/token-storage.service';
import { UserState } from './../../../share/state/user.state';
import { SocketIoService } from './../../../share/services/socketio/socket-io.service';
import { ConversationState } from './../../../share/state/conversation.state';
import { ConversationCreateModel } from './../../../share/models/conversation.model';
import { ConversationService } from './../../../share/services/conversition/conversation.service';
import { AddMemberModalComponent } from './../../../share/ui/modal/add-member-modal/add-member-modal.component';
import { ContentChatComponent } from './../../../share/ui/content-chat/content-chat.component';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ConversationModel } from 'src/app/share/models/conversation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, first, map, take } from 'rxjs';


@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.scss']
})
export class SidebarChatComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() listConversations: any;
  @Input() listFriend: any;
  @Output() newItemEvent = new EventEmitter<ConversationCreateModel>();
  @ViewChild('scrollChat') scrollChat!: ElementRef;

  constructor(private modalService: NgbModal,
    private conversationService: ConversationService,
    private conversationState: ConversationState,
    private socketIoService: SocketIoService,
    private userState: UserState,
    private tokenStorageService: TokenStorageService) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userState.$user.subscribe((res: any) => {
      if (res) {
        const listUser = [];
        listUser.push(res);
        listUser.push(this.tokenStorageService.getUser());
        listUser.push
        const conversation = new ConversationModel();
        conversation.conversationName = res.fullname;
        conversation.users = listUser;
        if (this.listConversations[0]?._id !== conversation?._id) {
          conversation && this.listConversations.unshift(conversation);
        }
        this.selectConversation(conversation);
      }
    });
    if (this.listConversations) {
      this.selectConversation(this.listConversations[0]);
      this.listConversations[0]?._id && this.socketIoService.selectRoom(this.listConversations[0]?._id);
    }
    this.socketIoService.getConversation().pipe().subscribe((conversation: any) => {
      if (conversation) {
        this.listConversations = this.listConversations.filter((res: any) => res._id && res._id !== conversation.conversation?._id);
        if (this.listConversations[0]._id !== conversation.conversation?._id) {
          this.listConversations.unshift(conversation.conversation);
          this.selectConversation(this.listConversations[0]);
        }
      }
    });
  }

  ngOnInit(): void {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.scrollChat.nativeElement.scrollTop = this.scrollChat.nativeElement.scrollHeight;
    } catch (err) { }
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
    conversation?._id && this.socketIoService.selectRoom(conversation?._id);
  }
}
