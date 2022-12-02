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
  conversationSelectId = '';
  @ViewChild('scrollChat') scrollChat!: ElementRef;
  conversations: any;
  currentUser = this.tokenStorageService.getUser();
  isMarkRead = false;
  constructor(private modalService: NgbModal,
    private conversationState: ConversationState,
    private socketIoService: SocketIoService,
    private userState: UserState,
    private tokenStorageService: TokenStorageService,
    private conversationService: ConversationService) { }
  ngAfterViewChecked(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.conversations = this.listConversations;
    this.userState.$user.subscribe((res: any) => {
      if (res) {
        console.log('res', res);
        const conversation = this.conversations.filter((conversation: any) => conversation.conversationName === 'one-to-one-codingclub' && conversation.users.some((user: any) => user._id === res.friend._id));
        console.log('conversation', conversation);
        setTimeout(() => {
          conversation[0] && this.selectConversation(conversation[0]);
        }, 100);
      }
    });
    if (this.listConversations) {
      this.selectConversation(this.listConversations[0]);
      this.listConversations[0]?._id && this.socketIoService.selectRoom(this.listConversations[0]?._id);
    }
    this.socketIoService.getConversation().pipe().subscribe((conversation: any) => {
      if (conversation) {
        this.listConversations = this.listConversations.filter((res: any) => res._id && res._id !== conversation.conversation?._id);
        if (this.listConversations[0]?._id !== conversation.conversation?._id) {
          this.listConversations.unshift(conversation.conversation);
        }
        this.listConversations[0] && this.selectConversation(this.listConversations[0]);
      }
    });
    this.conversationState.$isDeleteConversation.subscribe((res: any) => {
      if (res) {
        this.listConversations = this.listConversations.filter((conversation: any) => conversation._id !== res);
        this.listConversations[0] && this.selectConversation(this.listConversations[0]);
      }
    });
  }

  ngOnInit(): void {
  }
  openModalAddMember($event: any): void {
    const modalRef = this.modalService.open(AddMemberModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard : false
    })
    modalRef.componentInstance.listFriend = this.listFriend;
    modalRef.componentInstance.action = 'create-conversation';
    modalRef.result.then((result) => {
      this.newItemEvent.emit(result);
    })
  }

  selectConversation(conversation: ConversationModel) {
    console.log('selectConversation', conversation);
    this.conversationState.setConversation(conversation);
    conversation?._id && this.socketIoService.selectRoom(conversation?._id);
    this.conversationSelectId = conversation?._id;
    // conversation?.readStatus.some(userId => console.log(userId))
    // console.log('true/flase', conversation?.readStatus.some(userId => console.log(userId)));
    // console.log(this.currentUser._id);
    // (conversation?.readStatus.some(userId => userId !== this.currentUser._id) || conversation?.readStatus.length === 0) && this.conversationService.markRead(conversation?._id, [this.currentUser._id]).pipe(first()).subscribe((res: any) => {
    //   this.listConversations.forEach((conversationOld: any) => {
    //     if (conversationOld._id === conversation._id) {
    //       conversationOld?.readStatus.some((userId: string) => console.log(userId));
    //       console.log(conversationOld?.readStatus.some((userId: string) => userId !== this.currentUser._id));
    //       (conversationOld?.readStatus.some((userId: string) => userId !== this.currentUser._id) || conversationOld?.readStatus.length === 0) && conversationOld.readStatus.push(this.currentUser._id);
    //       console.log('conversationOld', conversationOld);
    //     }
    //   });
    // });
  }

  searchConversation(event: any): void {
    this.listConversations = this.conversations.filter((conversation: any) => 
      conversation.conversationName.replace(/[\s]/g,'').toLowerCase().indexOf(event.target.value.toLowerCase()) === 0 ||
      (conversation.users.some((user: any) => 
      user.account.username !== this.currentUser.account.username 
      && user.account.username.replace(/[\s]/g,'').toLowerCase().indexOf(event.target.value.toLowerCase()) === 0
      ) && conversation.users.length === 2)
    );
  }
}
