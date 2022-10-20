<<<<<<< HEAD
import { UserState } from './../../share/state/user.state';
import { UiModule } from 'src/app/share/ui/ui.module';
=======
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';
<<<<<<< HEAD
import { SidebarListUserComponent } from './sidebar-list-user/sidebar-list-user.component';
import { SuggestionUserComponent } from './suggestion-user/suggestion-user.component';
=======
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb


@NgModule({
  declarations: [
<<<<<<< HEAD
    ListUserComponent,
    SidebarListUserComponent,
    SuggestionUserComponent
  ],
  imports: [
    CommonModule,
    ListUserRoutingModule,
    UiModule
=======
    ListUserComponent
  ],
  imports: [
    CommonModule,
    ListUserRoutingModule
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
  ]
})
export class ListUserModule { }
