import { Component, OnInit } from '@angular/core';
import { EventsService } from '../eventservice/events.service';
import { PagingService } from '../pagingservice/paging.service'
import { Event } from '../eventservice/Event'
import { Page } from '../pagingservice/page';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  events: Event[];
  pages: Page[];
  index: number = 0;

  constructor(private eventService: EventsService, private pgs: PagingService) { }

  ngOnInit() {
    this.getPages(moment().valueOf());
  }

  createPagesAsync(array: Event[], input: number): Page[] {
    var pages: Page[] = new Array();

    var start = moment(input).startOf('week');
    var end = moment(input).endOf('week');
    var day = start;

    while (day <= end) {
      var temp = new Page();
      var tempEvents: Event[] = new Array();
   
      temp.day = day.valueOf();

      for (let e of array) {
        if (moment(day).isSame(e.startTime, 'day') && e.isActive) {
          tempEvents.push(e);
        }
      }

      day = day.clone().add(1, 'd');
      temp.days = tempEvents;
      pages.push(temp);
    }

    return pages;
  }

  getPages(input: number): void {
    this.eventService.getEvents().subscribe(e => {
      this.events = e;
      this.pages = this.createPagesAsync(this.events, input);
    });
  }

  onClickNext() {
    if (this.index == 1) {
      alert("You can only view a week after today.");
    }
    else {
      this.index++;
      this.getPages(moment().add(this.index, 'week').valueOf());
    }
    
  }

  onClickPrevious() {
    if (this.index == -1) {
      alert("You can only view a week before today.");
    }
    else {
      this.index--;
      this.getPages(moment().add(this.index, 'week').valueOf());
    }
  }


}
