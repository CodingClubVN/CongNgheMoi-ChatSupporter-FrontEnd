import { UserModel } from 'src/app/share/models/user.model';
import { map, Observable } from 'rxjs';
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

  constructor(private apiService: ApiService) { }

  private getAllUser(): Observable<UserModel[]>{
    const pathUrl = `${apiUrl}/${path.me}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  private getMe(): Observable<UserModel>{
    const pathUrl = `${apiUrl}/${path.me}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }
}
