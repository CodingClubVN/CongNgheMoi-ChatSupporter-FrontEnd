import { ConfirmDiglogComponent } from './../modal/confirm-diglog/confirm-diglog.component';
import { ListConversationModalComponent } from './../modal/list-conversation-modal/list-conversation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../services/user/user.service';
import { ConversationCreateModel } from './../../models/conversation.model';
import { ConversationService } from './../../services/conversition/conversation.service';
import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { UserModel } from './../../models/user.model';
import { MessageModel } from './../../models/message.model';
import { SocketIoService } from './../../services/socketio/socket-io.service';
import { ConversationState } from './../../state/conversation.state';
import { FormGroup, FormControl } from '@angular/forms';
import { ConversationModel } from '../../models/conversation.model';
import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { switchMap, map } from 'rxjs';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss']
})
export class ContentChatComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
  chatForm = this.initFormChat();
  conversatinSelect!: ConversationModel;
  listMessage: MessageModel[] = [];
  curentUser!: UserModel;
  isColapse = false;
  @ViewChild('scrollChat') scrollChat!: ElementRef;
  @Input() listFriend: any;
  file: any[] = [];
  messageReplySelect: any = null;

  constructor(private conversationState: ConversationState,
    private socketIoService: SocketIoService,
    private tokenStorageService: TokenStorageService,
    private conversationService: ConversationService,
    private modalService: NgbModal) { }
  ngOnDestroy(): void {
    this.messageReplySelect = new MessageModel();
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  onFileSelected(event: any): void {
    const file = (event.target.files as File);
    for (let i = 0; i < event.target.files.length; i++) {
      this.file.push(event.target.files[i]);
    }
    this.sendMessage(event);
  }


  ngOnInit(): void {
    this.curentUser = this.tokenStorageService.getUser();
    this.loadData();
  }

  loadData(): void {
    this.conversationState.$conversation.subscribe((conversation: any) => {
      this.conversatinSelect = conversation;
      this.conversatinSelect?._id ? this.socketIoService.getAllMessageByConversation(this.conversatinSelect?._id).subscribe(res => {
        this.listMessage = res.reverse();
        this.scrollToBottom();
        console.log('this.listMessage', this.listMessage);
      }) : this.listMessage = [];
    });
    this.socketIoService.getMessages().subscribe(res => {
      this.listMessage.push(res.message);
    });
  }

  scrollToBottom(): void {
    try {
      this.scrollChat.nativeElement.scrollTop = this.scrollChat.nativeElement.scrollHeight;
    } catch (err) { }
  }

  initFormChat(): FormGroup {
    return new FormGroup({
      contentChat: new FormControl(''),
      fileUpload: new FormControl(null),
    });
  }

  enterSendMessage(event: any): void {
    this.sendMessage(event);
    event.preventDefault();
    event.stopPropagation();
  }

  sendMessage(event: any): void {
    const fd: FormData = new FormData();
    let typeMesage = 'text';
    if (this.file[0]?.type.includes('image')) {
      typeMesage = 'image';
    } else if (this.file[0]?.type.includes('video')) {
      typeMesage = 'video';
    } else if (this.file[0]?.type.includes('application')) {
      typeMesage = 'file';
    }
    !isEmpty(this.file) && this.file.map(file => fd.append('files', file));
    fd.append('content', this.chatForm.value.contentChat);
    fd.append('type', typeMesage);
    fd.append('description', 'description');

    if (!this.messageReplySelect) {
      this.socketIoService.sendMessage(fd, this.conversatinSelect?._id).subscribe(res => {
        this.chatForm.reset();
        this.file = [];
      });
    } else {
      fd.append('messageAnswarId', this.messageReplySelect?._id);
      this.socketIoService.sendMessage(fd, this.conversatinSelect?._id).subscribe(res => {
        this.chatForm.reset();
        this.file = [];
        this.messageReplySelect = null;
      });
    }
  }

  addEmoji(event: any): void {
    this.chatForm.patchValue({
      contentChat: this.chatForm.value.contentChat ? this.chatForm.value.contentChat?.concat(event.emoji.native) : event.emoji.native
    })
  }

  reload(event: any): void {
    this.loadData();
  }

  replyMessage(message: MessageModel): void {
    this.messageReplySelect = message;
    console.log('message', this.messageReplySelect);
  }
  cancelReply(event: any): void {
    this.messageReplySelect = null;
  }

  recoverMessage(message: any): void {
    const modalRef = this.modalService.open(ConfirmDiglogComponent);
    modalRef.componentInstance.title = 'Message recovery';
    modalRef.componentInstance.message = `Do you want to withdraw this message?`;
    modalRef.result.then((result) => {
      if (!result) {
        return;
      }
      this.socketIoService.recoverMessage(message._id).subscribe(res => {
        this.loadData();
      }
      );
    })
  }
  forwardMessage(message: any): void {
    const modalRef = this.modalService.open(ListConversationModalComponent, {
      size: 'md'
    })
    modalRef.componentInstance.action = 'my-profile';
    modalRef.result.then((result) => {
      result.forEach((conversationId: any) => {
        this.socketIoService.forwardMessage(message._id, conversationId).subscribe(res => {
          console.log('res', res);
        });
      });
    })
  }
}
