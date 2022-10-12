import { TokenModel } from './../../../share/models/token.model';
import { AccountModel } from './../../../share/models/account.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/share/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.initFormLogin();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  initFormLogin(): FormGroup {
    return new FormGroup({
      username: new FormControl('thaihoc123', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('123123123', [Validators.required, Validators.minLength(6)])
    });
  }
  login(): void {
    const account = new AccountModel();
    account.username = this.loginForm.getRawValue().username;
    account.password = this.loginForm.getRawValue().password;
    this.authService.login(account).subscribe((data: TokenModel) => {
      this.loginForm.reset();
    }, 
    error => {
      console.log(error);
    }
    );
  }
}
