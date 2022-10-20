import { Router } from '@angular/router';
import { UserState } from './../../../share/state/user.state';
import { UserModel } from 'src/app/share/models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-list-user',
  templateUrl: './sidebar-list-user.component.html',
  styleUrls: ['./sidebar-list-user.component.scss']
})
export class SidebarListUserComponent implements OnInit {
  @Input() listFriends: UserModel[] = [];
  constructor(private userState: UserState,
              private router: Router) { }

  ngOnInit(): void {
  }
  selectFriend(user: UserModel): void{
    this.userState.setStateUser(user);
    this.router.navigate(['/home/chat']);
  }
}
