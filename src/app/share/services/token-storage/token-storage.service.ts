import { Injectable } from '@angular/core';
import {apiPath} from "../../constance/api-path";
import {LocalStorageService} from 'ngx-webstorage';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../../environments/environment.prod';
import { toInteger } from 'lodash';


const key = apiPath.cookie;
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService{

  constructor(private cookieService: CookieService) { }

  public saveToken(token: string): void {
    const future = toInteger(Date.now()) + 5 * 60000;
    console.log(future);
    this.cookieService.set(key.ID_KEY, token,{ 
      expires: future, 
      path: '/', 
      sameSite: 'Strict' 
   });
  }
  public getToken(): any {
    return this.cookieService.get(key.ID_KEY);
  }
  public addUser(user: any): void{
    const future = toInteger(Date.now()) + 5 * 60000;
    this.cookieService.set(key.USER, JSON.stringify(user), { 
      expires: future, 
      path: '/', 
      sameSite: 'Strict' 
   });
  }
  public getUser(): any{
    return JSON.parse(this.cookieService.get(key.USER));
  }
  // public saveRefreshToken(token: string): void {
  //   this.cookieService?.clear(key.Refresh_Token);
  //   this.cookieService?.store(key.Refresh_Token, token);
  // }
  // public getRefreshToken(): any {
  //   return this.cookieService.retrieve(key.Refresh_Token);
  // }
  // public signOut(): void {
  //   this.cookieService.clear();
  // }
  // public saveUsername(username: string): void {
  //   this.cookieService.store(key.USERNAME_KEY, username);
  // }
  // public getUsername(): void{
  //   this.cookieService.retrieve(key.USERNAME_KEY);
  // }
  // public addCart(product: any): void{
  //   this.cookieService.store(key.CART, JSON.stringify(product));
  // }
  // public getCartItem(): any{
  //   return this.cookieService.retrieve(key.CART) ? JSON.parse(this.cookieService.retrieve(key.CART)) : [];
  // }
  // public clearOrder(): any{
  //   this.cookieService.clear(key.USER);
  //   this.cookieService.clear(key.CART);
  // }
}
