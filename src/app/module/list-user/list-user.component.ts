import { UserModel } from 'src/app/share/models/user.model';
import { UserService } from './../../share/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  listFriends: UserModel[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(users => {
      this.listFriends = users;
      console.log(this.listFriends);
    });
  }

}
