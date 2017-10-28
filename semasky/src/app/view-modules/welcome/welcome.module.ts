import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

import { GlobalModule } from '../global/global.module';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    WelcomeRoutingModule,
    GlobalModule
  ],
  exports: [
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
