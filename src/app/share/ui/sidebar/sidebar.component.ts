import { UserModel } from 'src/app/share/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ProfileModalComponent } from '../modal/profile-modal/profile-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  me!: UserModel;
  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.me = this.tokenStorageService.getUser();
    console.log('me', this.me);
  }
  signout($event: any): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/auth/login']);
    if (!this.tokenStorageService.getToken()) {
    }
  }
  openModalProfile(event: any): void {
    const modalRef = this.modalService.open(ProfileModalComponent, {
      size: 'md'
    })
    modalRef.componentInstance.action = 'my-profile';
    modalRef.componentInstance.user = this.me;
    modalRef.result.then((result) => {
    })
  }
}
