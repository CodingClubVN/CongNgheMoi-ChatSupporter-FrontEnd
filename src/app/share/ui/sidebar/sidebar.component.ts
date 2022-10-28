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

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  signout($event: any): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/auth/login']);
    if (!this.tokenStorageService.getToken()) {
    }
  }
  openModalProfile(event: any): void {
    const modalRef = this.modalService.open(ProfileModalComponent, {
      size: 'lg'
    })
    modalRef.result.then((result) => {
    })
  }
}
