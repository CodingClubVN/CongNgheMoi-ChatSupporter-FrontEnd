<<<<<<< HEAD
import { UserModel } from 'src/app/share/models/user.model';
import { UserService } from './../../share/services/user/user.service';
=======
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
<<<<<<< HEAD
  listFriends: UserModel[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(users => {
      this.listFriends = users;
      console.log(this.listFriends);
    });
=======

  constructor() { }

  ngOnInit(): void {
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
  }

}
