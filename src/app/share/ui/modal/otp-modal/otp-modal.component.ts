import { Router } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { TokenStorageService } from './../../../services/token-storage/token-storage.service';
import { finalize, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/share/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/share/models/user.model';
import { AccountModel } from 'src/app/share/models/account.model';
import { TokenModel } from 'src/app/share/models/token.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss']
})
export class OtpModalComponent implements OnInit {
  @Input() user!: UserModel;
  @Input() account!: AccountModel;
  formOTP = this.initFormOTP();
  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private userSerivce: UserService,
              private router: Router,
              private modal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.user);
  }

  initFormOTP(): FormGroup {
    return new FormGroup({
      number1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      number2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      number3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      number4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      number5: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      number6: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });
  }

  nextValue(value: string): void{
    console.log(value);
    switch (value) {
      case 'number1':
        if (this.formOTP.getRawValue().number1 !== ''){
          document.getElementById('number2')?.focus();
        }
        break;
      case 'number2':
        if (this.formOTP.getRawValue().number2 !== ''){
          document.getElementById('number3')?.focus();
        } else {
          document.getElementById('number1')?.focus();
        }
        break;
      case 'number3':
        if (this.formOTP.getRawValue().number3 !== ''){
          document.getElementById('number4')?.focus();
        } else {
          document.getElementById('number2')?.focus();
        }
        break;
      case 'number4':
        if (this.formOTP.getRawValue().number4 !== ''){
          document.getElementById('number5')?.focus();
        } else {
          document.getElementById('number3')?.focus();
        }
        break;
      case 'number5':
        if (this.formOTP.getRawValue().number5 !== ''){
          document.getElementById('number6')?.focus();
        } else {
          document.getElementById('number4')?.focus();
        }
      break;
      case 'number6':
        if (this.formOTP.getRawValue().number6 !== ''){
          // Send OTP
          const otpNumber = this.formOTP.getRawValue().number1 + this.formOTP.getRawValue().number2 + this.formOTP.getRawValue().number3 + this.formOTP.getRawValue().number4 + this.formOTP.getRawValue().number5 + this.formOTP.getRawValue().number6;
          console.log(otpNumber);
          this.authService.verifyOTP(otpNumber, this.user.email).pipe(
            mergeMap(res => {
               return this.authService.register(this.user)
            }),
            mergeMap(res => {
              const account = new AccountModel();
              account.username = this.account.username;
              account.password = this.account.password;
              return this.authService.login(account)
            }),
            tap(res => {
              this.tokenStorageService.saveToken(res.token);
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
            })
          ).subscribe(() => {
            this.modal.close();
          });
        } else {
          document.getElementById('number5')?.focus();
        }
    }
  }
}
