import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

import { EventsService } from '../app/eventservice/events.service'
import { PagingService } from '../app/pagingservice/paging.service'

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PagingService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
