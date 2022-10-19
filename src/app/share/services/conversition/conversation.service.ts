import { ConversationModel } from './../../models/conversation.model';
import { map, Observable } from 'rxjs';
import { ApiService } from './../_core/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { apiPath } from '../../constance/api-path';
import { HttpResponse } from '@angular/common/http';

const apiUrl = environment.apiUrl;
const path = apiPath.conversation;

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private apiService: ApiService) { }

  private getMyConversations(): Observable<ConversationModel[]> {
    const url = `${apiUrl}/${path.conversation}`;
    return this.apiService.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );;
  }

  private createConversation(conversation: ConversationModel): Observable<ConversationModel> {
    const url = `${apiUrl}/${path.conversation}`;
    return this.apiService.post(url, conversation).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  private getConversationById(id: number): Observable<ConversationModel> {
    const url = `${apiUrl}/${path.conversation}/${id}`;
    return this.apiService.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  private updateConversation(id: string, arrayUserId: string[]): Observable<ConversationModel> {
    const url = `${apiUrl}/${path.conversation}/${id}/add-user`;
    return this.apiService.put(url, arrayUserId).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }
}
