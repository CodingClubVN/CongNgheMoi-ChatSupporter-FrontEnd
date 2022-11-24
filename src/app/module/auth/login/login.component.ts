import { OtpModalComponent } from './../../../share/ui/modal/otp-modal/otp-modal.component';
import { finalize } from 'rxjs/operators';
import { UserService } from './../../../share/services/user/user.service';
import { TokenStorageService } from './../../../share/services/token-storage/token-storage.service';
import { TokenModel } from './../../../share/models/token.model';
import { AccountModel } from './../../../share/models/account.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/share/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.initFormLogin();
  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private userSerivce: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  initFormLogin(): FormGroup {
    return new FormGroup({
      username: new FormControl('thaihoc1', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('123123123', [Validators.required, Validators.minLength(6)])
    });
  }
  login(): void {
    const account = new AccountModel();
    account.username = this.loginForm.getRawValue().username;
    account.password = this.loginForm.getRawValue().password;
    // this.modalService.open(OtpModalComponent, {
    //   size: 'lg'
    // })
    this.authService.login(account).subscribe((data: TokenModel) => {
      this.tokenStorageService.saveToken(data.token);
      this.loginForm.reset();
      this.userSerivce.getMe().pipe(
        finalize(() => {
          const token = this.tokenStorageService.getToken();
          const user = this.tokenStorageService.getUser();
          if (token && user) {
            this.router.navigate(['/home/chat']);
          }
        })
      ).subscribe(me => {
        this.tokenStorageService.addUser(me);
      });
    },
      error => {
        console.log(error);
      }
    );
  }
}
