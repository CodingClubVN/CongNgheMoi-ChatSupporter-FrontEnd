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
import { NotifierService } from 'src/app/share/services/notify/notifier.service';

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
    private modalService: NgbModal,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
  }
  initFormLogin(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  login(): void {
    const account = new AccountModel();
    account.username = this.loginForm.getRawValue().username;
    account.password = this.loginForm.getRawValue().password;
    this.authService.login(account).subscribe((data: TokenModel) => {
      this.tokenStorageService.saveToken(data.token);
      this.loginForm.reset();
      this.userSerivce.getMe().pipe(
        finalize(() => {
          this.notifierService.success('Login success !', 'Suscess');
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
        this.notifierService.error('Username or password is incorrect', 'Login failed');
        console.log(error);
      }
    );
  }

  isControlValid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(formGroup: FormGroup, validation: any, controlName: any): boolean {
    const control = formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(formGroup: FormGroup, controlName: any): boolean {
    const control = formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
