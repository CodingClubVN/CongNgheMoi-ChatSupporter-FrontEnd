<<<<<<< HEAD
import { ReactiveFormsModule } from '@angular/forms';
import { ContentChatComponent } from './content-chat/content-chat.component';
=======
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
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
<<<<<<< HEAD
    RouterModule,
    ReactiveFormsModule
=======
    RouterModule
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
  ],
  exports: [
    SidebarComponent,
    ContentChatComponent
  ]
})
export class UiModule { }
