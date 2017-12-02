import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Event } from '../eventservice/Event';
import { catchError, map, tap  } from 'rxjs/operators';

@Injectable()
export class EventsService {
  private eventsURL = 'http://3973a2.azurewebsites.net/api/EventsApi/';  // URL to web api

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsURL).pipe(catchError(this.handleError('getEvents', [])));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  

}
