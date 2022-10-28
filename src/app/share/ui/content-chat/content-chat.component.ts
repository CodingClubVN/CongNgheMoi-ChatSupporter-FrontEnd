import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { UserModel } from './../../models/user.model';
import { MessageModel } from './../../models/message.model';
import { SocketIoService } from './../../services/socketio/socket-io.service';
import { ConversationState } from './../../state/conversation.state';
import { FormGroup, FormControl } from '@angular/forms';
import { ConversationModel } from '../../models/conversation.model';
import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss']
})
export class ContentChatComponent implements OnInit, AfterViewChecked {
  chatForm = this.initFormChat();
  conversatinSelect!: ConversationModel | null;
  listMessage: MessageModel[] = [];
  curentUser!: UserModel;
  isColapse = false;
  @ViewChild('scrollChat') scrollChat!: ElementRef;
  @Input() listFriend: any;


  constructor(private conversationState: ConversationState,
    private socketIoService: SocketIoService,
    private tokenStorageService: TokenStorageService) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.conversationState.$conversation.subscribe(conversation => {
      this.conversatinSelect = conversation;
      this.conversatinSelect && this.socketIoService.getAllMessageByConversation(this.conversatinSelect?._id).subscribe(res => {
        this.listMessage = res.reverse();
      });
    });
    this.socketIoService.getMessages().subscribe(res => {
      this.listMessage.push(res.message);
    });
    this.curentUser = this.tokenStorageService.getUser();
  }

  scrollToBottom(): void {
    try {
      this.scrollChat.nativeElement.scrollTop = this.scrollChat.nativeElement.scrollHeight;
    } catch (err) { }
  }

  initFormChat(): FormGroup {
    return new FormGroup({
      contentChat: new FormControl('')
    });
  }

  sendMessage(event: any): void {
    const message = new MessageModel();
    message.content = this.chatForm.value.contentChat;
    message.type = 'text',
    message.description = 'message';
    console.log(this.conversatinSelect);
    this.conversatinSelect && this.socketIoService.sendMessage(message, this.conversatinSelect?._id).subscribe(res => {
      this.chatForm.reset();
    });
  }
}
