import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search.component';
import { SearchMainComponent } from './search-main.component';
import { SearchResultComponent } from './search-result.component';
import { UploadComponent } from './upload.component';
import { SearchRoutingModule } from './search-routing.module';

import { GlobalModule } from '../global/global.module';

@NgModule({
  declarations: [
    SearchComponent,
    SearchMainComponent,
    UploadComponent,
    SearchResultComponent
  ],
  imports: [
    SearchRoutingModule,
    GlobalModule,
    CommonModule
  ],
  exports: [
    SearchRoutingModule
  ]
})
export class SearchModule { }
