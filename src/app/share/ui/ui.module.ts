import { ReactiveFormsModule } from '@angular/forms';
import { ContentChatComponent } from './content-chat/content-chat.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ContentChatComponent,
    AddMemberModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    ContentChatComponent
  ]
})
export class UiModule { }
