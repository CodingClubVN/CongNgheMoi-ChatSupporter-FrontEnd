import { UserModel } from 'src/app/share/models/user.model';
<<<<<<< HEAD
import { BehaviorSubject, map, Observable } from 'rxjs';
=======
import { map, Observable } from 'rxjs';
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
import { ApiService } from './../_core/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { apiPath } from '../../constance/api-path';
import { HttpResponse } from '@angular/common/http';

const apiUrl = environment.apiUrl;
const path = apiPath.user;

@Injectable({
  providedIn: 'root'
})
export class UserService {
<<<<<<< HEAD
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  public $user = this.userSubject.asObservable();
  
  constructor(private apiService: ApiService) { }

  public getAllUser(): Observable<UserModel[]>{
    const pathUrl = `${apiUrl}/${path.user}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body.data;
=======

  constructor(private apiService: ApiService) { }

  private getAllUser(): Observable<UserModel[]>{
    const pathUrl = `${apiUrl}/${path.me}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
        return body;
      })
    );
  }

<<<<<<< HEAD
  public getMe(): Observable<UserModel>{
=======
  private getMe(): Observable<UserModel>{
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
    const pathUrl = `${apiUrl}/${path.me}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }
}
