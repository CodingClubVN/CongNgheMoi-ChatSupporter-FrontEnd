import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }
  signout($event: any): void {
    console.log('signout');
    this.tokenStorageService.signOut();
    this.router.navigate(['/auth/login']);
    if (!this.tokenStorageService.getToken()) {
    }
  }
}
