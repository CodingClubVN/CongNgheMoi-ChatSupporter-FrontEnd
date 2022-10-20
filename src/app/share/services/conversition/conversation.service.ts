<<<<<<< HEAD
import { ConversationModel, ConversationCreateModel } from './../../models/conversation.model';
=======
import { ConversationModel } from './../../models/conversation.model';
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
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
<<<<<<< HEAD
export class ConversationService {

  constructor(private apiService: ApiService) { }

  public getALLConversations(): Observable<ConversationModel[]> {
    const url = `${apiUrl}/${path.conversation}`;
    return this.apiService.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body.data;
=======
export class ConversitionService {

  constructor(private apiService: ApiService) { }

  private getMyConversations(): Observable<ConversationModel[]> {
    const url = `${apiUrl}/${path.conversation}`;
    return this.apiService.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
        return body;
      })
    );;
  }

<<<<<<< HEAD
  public createConversation(conversation: ConversationCreateModel): Observable<ConversationModel> {
=======
  private createConversation(conversation: ConversationModel): Observable<ConversationModel> {
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
    const url = `${apiUrl}/${path.conversation}`;
    return this.apiService.post(url, conversation).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

<<<<<<< HEAD
  public getConversationById(id: number): Observable<ConversationModel> {
=======
  private getConversationById(id: number): Observable<ConversationModel> {
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
    const url = `${apiUrl}/${path.conversation}/${id}`;
    return this.apiService.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

<<<<<<< HEAD
  public updateConversation(id: string, arrayUserId: string[]): Observable<ConversationModel> {
=======
  private updateConversation(id: string, arrayUserId: string[]): Observable<ConversationModel> {
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
    const url = `${apiUrl}/${path.conversation}/${id}/add-user`;
    return this.apiService.put(url, arrayUserId).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }
}
