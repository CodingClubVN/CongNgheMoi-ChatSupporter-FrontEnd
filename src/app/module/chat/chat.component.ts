import { UserService } from './../../share/services/user/user.service';
import { UserState } from './../../share/state/user.state';
import { UserModel } from 'src/app/share/models/user.model';
import { TokenStorageService } from './../../share/services/token-storage/token-storage.service';
import { ConversationModel } from './../../share/models/conversation.model';
import { ConversationService } from './../../share/services/conversition/conversation.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  listConversations: ConversationModel[] = [];
  currentUser: any;
  listFriend: UserModel[] = [];

  constructor(private conversationService: ConversationService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.listenService();
  }

  listenService() {
    this.currentUser = this.tokenStorageService.getUser();
    this.conversationService.getALLConversations().subscribe(conversation => {
      this.listConversations = conversation
      this.listConversations.map(conversation => {
        conversation.users.filter(filterUser => filterUser.userId !== this.currentUser._id).map(usermap => {
          const listUser = [];
          listUser.push(usermap);
          conversation.users = listUser;
        })
      });
    });
    this.userService.getAllUser().subscribe(users => {
      this.listFriend = users;
    });
  }
  getConversation(event: any): void {
    this.conversationService.createConversation(event).subscribe((conversation: ConversationModel) => {
      console.log('conversation', conversation);
      this.listenService()
    })
  }
}
