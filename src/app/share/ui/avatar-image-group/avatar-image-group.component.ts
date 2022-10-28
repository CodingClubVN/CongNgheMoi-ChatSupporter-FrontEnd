import { UserModel } from 'src/app/share/models/user.model';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-avatar-image-group',
  templateUrl: './avatar-image-group.component.html',
  styleUrls: ['./avatar-image-group.component.scss']
})
export class AvatarImageGroupComponent implements OnInit, OnChanges {
  @Input('listUser') listUser: UserModel[] | undefined;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.listUser && this.listUser?.length > 4 ? this.listUser = this.listUser?.slice(0, 4) : this.listUser;
  }

  ngOnInit(): void {
  }

}
