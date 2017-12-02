import { Injectable } from '@angular/core';
import { Page } from '../pagingservice/page';
import { EventsService } from '../eventservice/events.service';
import { Event } from '../eventservice/Event'
import * as moment from 'moment';

@Injectable()
export class PagingService {

    events: Event[];
    pages: Page[];

    constructor(private evs: EventsService) { }

    getDays(): number[]{
        var days = new Array();
        var start = moment().startOf('week');
        var end = moment().endOf('week');
        var day = start;

        while (day <= end) {
            days.push(day.valueOf());
            day = day.clone().add(1, 'd');
        }

        return days;
        
        /*
        var days = new Array(moment().day("Monday"), moment().day("Tuesday"), moment().day("Wednesday"));
        return days;
        */
    }
}
