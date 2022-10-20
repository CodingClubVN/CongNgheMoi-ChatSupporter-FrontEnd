import { ConversationModel } from 'src/app/share/models/conversation.model';
import { ConversationService } from './../services/conversition/conversation.service';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationState implements OnDestroy {
    private listConversationSubject = new BehaviorSubject<ConversationModel[]>([]);
    public $conversations = this.listConversationSubject.asObservable();

    subscription: Subscription = new Subscription();

    constructor() { }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public setStateUser(conversationModel: ConversationModel[]): void {
        this.listConversationSubject.next(conversationModel);
    }

    public getStateUser(): ConversationModel[] {
        return this.listConversationSubject.getValue();
    }
}
