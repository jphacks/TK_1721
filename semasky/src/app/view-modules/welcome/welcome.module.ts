import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeComponent } from './welcome.component';
import { CatchComponent } from './catch.component';
import { IntroductionComponent } from './introduction.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

import { GlobalModule } from '../global/global.module';

@NgModule({
  declarations: [
    WelcomeComponent,
    CatchComponent,
    IntroductionComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    WelcomeRoutingModule,
    GlobalModule,
    CommonModule
  ],
  exports: [
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
