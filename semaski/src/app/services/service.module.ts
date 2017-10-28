import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ApiService } from './base';
import { LoginService } from './login';
import { RegisterService } from './register';
import { UserStoreService } from './users';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    ApiService,
    LoginService,
    RegisterService,
    UserStoreService
  ]
})

export class ServiceModule { }
