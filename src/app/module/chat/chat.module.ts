import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';
import { ContentChatComponent } from './content-chat/content-chat.component';


@NgModule({
  declarations: [
    ChatComponent,
    SidebarChatComponent,
    ContentChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
