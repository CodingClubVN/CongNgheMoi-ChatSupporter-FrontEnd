import { SocketIoService } from './../../../share/services/socketio/socket-io.service';
import { TokenStorageService } from './../../../share/services/token-storage/token-storage.service';
import { FriendService } from './../../../share/services/friend/friend.service';
import { ListRequestComponent } from './../../../share/ui/modal/list-request/list-request.component';
import { Router } from '@angular/router';
import { UserState } from './../../../share/state/user.state';
import { UserModel } from 'src/app/share/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListUserComponent } from '../list-user.component';
import { ConfirmDiglogComponent } from 'src/app/share/ui/modal/confirm-diglog/confirm-diglog.component';

@Component({
  selector: 'app-sidebar-list-user',
  templateUrl: './sidebar-list-user.component.html',
  styleUrls: ['./sidebar-list-user.component.scss']
})
export class SidebarListUserComponent implements OnInit {
  @Input() listFriends: any[] = [];
  @Input() listRequestFriends: any[] = [];
  constructor(private userState: UserState,
              private router: Router,
              private modalService: NgbModal,
              private friendService: FriendService,
              private socketIoService: SocketIoService) { }

  ngOnInit(): void {
    this.socketIoService.sendReqestFriend().subscribe((res: any) => {
      this.listenService();
    });
    this.socketIoService.acceptFriend().subscribe((res: any) => {
      this.listenService();
      this.listRequestFriends = this.listRequestFriends.filter((item: any) => item.fromUser._id !== res._id);
    });
  }
  listenService(): void {
    this.friendService.getAllFriends().subscribe(users => {
      this.listFriends = users;
      console.log('listFriends', this.listFriends);
    });
    this.friendService.getAllRequestFriend().subscribe(reuquests => {
      this.listRequestFriends = reuquests;
    })
  }

  selectFriend(user: UserModel): void{
    this.userState.setStateUser(user);
    this.router.navigate(['/home/chat']);
  }

  openModalRequest(event: any): void {
    const modalRef = this.modalService.open(ListRequestComponent, {
      size: 'md'
    });
    
    modalRef.componentInstance.listRequestFriends = this.listRequestFriends;
  }

  acceptRequest(user: any): void {
    this.friendService.approveRequestFriend(user.fromUser._id).subscribe((res: any) => {
      this.listenService();
    });
  }

  rejectRequest(user: any): void {
    this.friendService.rejectRequestFriend(user.fromUser._id).subscribe((res: any) => {
      this.listenService();
    });
    console.log('reject', user);
  }

  unFriend(user: any, event: any): void {
    event.stopPropagation();
    event.preventDefault();
    console.log('unFriend', user);

    const modalRef = this.modalService.open(ConfirmDiglogComponent);
    modalRef.componentInstance.title = 'Unfriend';
    modalRef.componentInstance.message = `Do you want to unfriend ${user?.friend?.account?.username} ?`;
    modalRef.result.then((result) => {
      if (!result) {
        return;
      }
      this.friendService.unFriend(user?.friend?._id).subscribe((res: any) => {
        this.listenService();
      });
    })

  }
}
