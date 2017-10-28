import { NgModule } from '@angular/core';

import { SearchComponent } from './search.component';
import { SearchBoxComponent } from './search-box.component';
import { SearchRoutingModule } from './search-routing.module';

import { GlobalModule } from '../global/global.module';

@NgModule({
  declarations: [
    SearchComponent,
    SearchBoxComponent
  ],
  imports: [
    SearchRoutingModule,
    GlobalModule
  ],
  exports: [
    SearchRoutingModule
  ]
})
export class SearchModule { }
