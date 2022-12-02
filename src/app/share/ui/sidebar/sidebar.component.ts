import { UserService } from './../../services/user/user.service';
import { UserModel } from 'src/app/share/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { ProfileModalComponent } from '../modal/profile-modal/profile-modal.component';
import { NotifierService } from '../../services/notify/notifier.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  me!: UserModel;
  status = '';
  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.me = this.tokenStorageService.getUser();
    console.log(this.me);
    if (this.router.url.includes('chat')){
      this.status = 'chat';
    } else if (this.router.url.includes('list-user')) {
      this.status = 'users';
    }
  }
  signout($event: any): void {
    this.tokenStorageService.signOut();
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/auth/login']);
    }
  }
  openModalProfile(event: any): void {
    const modalRef = this.modalService.open(ProfileModalComponent, {
      size: 'md'
    })
    modalRef.componentInstance.action = 'my-profile';
    modalRef.componentInstance.user = this.me;
    modalRef.result.then((result) => {
      console.log(result);
      console.log(this.me);
      const formdata: FormData = new FormData();
      formdata.append('avatar', result.avatar);
      formdata.append('fullname', result.form.fullname);
      formdata.append('phone', result.form.phone);
      formdata.append('about', result.form.about);
      formdata.append('yearOrBirth', result.form.yearOfBirth);

      this.userService.updateUser(this.me?._id, formdata).subscribe((res: any) => {
        this.notifierService.success('Update profile successfuly !', 'Success');
        this.me = res;
        this.tokenStorageService.addUser(this.me);
      },
      err => {
        this.notifierService.error('Update profile failed !', 'Error');
      });
    })
  }
  onSelect(type: string) : void {
    this.status = type;
  }
}
