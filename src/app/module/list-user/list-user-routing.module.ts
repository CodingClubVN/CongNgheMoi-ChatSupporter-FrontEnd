<<<<<<< HEAD
import { ContentChatComponent } from './../../share/ui/content-chat/content-chat.component';
import { SuggestionUserComponent } from './suggestion-user/suggestion-user.component';
=======
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
import { ListUserComponent } from './list-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    component: ListUserComponent,
    children: [
      {
        path: '',
        redirectTo: 'suggest',
        pathMatch: 'full'
      },
      {
        path: 'suggest',
        component: SuggestionUserComponent
      },
      {
        path: 'chat',
        component: ContentChatComponent
      }
    ]
=======
    component: ListUserComponent
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUserRoutingModule { }
