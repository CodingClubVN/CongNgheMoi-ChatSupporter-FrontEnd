import { AuthService } from 'src/app/share/services/auth/auth.service';
import { TokenStorageService } from './../services/token-storage/token-storage.service';
import { UserService } from './../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentChatComponent } from './content-chat/content-chat.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddMemberModalComponent } from './modal/add-member-modal/add-member-modal.component';
import { AvatarImageGroupComponent } from './avatar-image-group/avatar-image-group.component';
import { OptionChatComponent } from './option-chat/option-chat.component';
import { ProfileModalComponent } from './modal/profile-modal/profile-modal.component';
import { ListRequestComponent } from './modal/list-request/list-request.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ListConversationModalComponent } from './modal/list-conversation-modal/list-conversation-modal.component';
import { ConfirmDiglogComponent } from './modal/confirm-diglog/confirm-diglog.component';
import { OtpModalComponent } from './modal/otp-modal/otp-modal.component';
import { EditNameConversationModalComponent } from './modal/edit-name-conversation-modal/edit-name-conversation-modal.component';
import { CallVideoModalComponent } from './modal/call-video-modal/call-video-modal.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ContentChatComponent,
    AddMemberModalComponent,
    AvatarImageGroupComponent,
    OptionChatComponent,
    ProfileModalComponent,
    ListRequestComponent,
    ListConversationModalComponent,
    ConfirmDiglogComponent,
    OtpModalComponent,
    EditNameConversationModalComponent,
    CallVideoModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PickerModule
  ],
  exports: [
    SidebarComponent,
    ContentChatComponent,
    AvatarImageGroupComponent
  ],
  providers: [
    UserService,
    TokenStorageService,
    AuthService
  ]
})
export class UiModule { }
