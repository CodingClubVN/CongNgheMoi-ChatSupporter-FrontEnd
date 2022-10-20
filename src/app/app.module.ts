<<<<<<< HEAD
import { UserState } from './share/state/user.state';
=======
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
import { UiModule } from './share/ui/ui.module';
import { TokenStorageService } from './share/services/token-storage/token-storage.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LocalStorageService, NgxWebstorageModule, StrategyCacheService, StrategyIndex} from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';
import { ModalModule } from 'ngb-modal';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'custom', separator: '.', caseSensitive:true }),
<<<<<<< HEAD
    UiModule,
    ModalModule
=======
    UiModule
>>>>>>> 241921698f9737d19e9a35fa5b157d2a086b50bb
  ],
  providers: [
    TokenStorageService, 
    CookieService,
    UserState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
