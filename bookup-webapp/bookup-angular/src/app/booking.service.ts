import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private driver: BehaviorSubject<Object> = new BehaviorSubject<Object> (Object);
  constructor(private http: HttpClient) { }


  getStatus(){
    return this.subject.asObservable();
  }

  pushStatus(data){
    this.subject.next(data);
  }

  getRate(){
    return this.driver.asObservable();
  }

  postRate(data){
    this.driver.next(data);
  }
  getDrivers(): Observable<any> {
    return this.http.get(`/book/driver`);
  }

  bookTickets(data): Observable<any>{
    return this.http.post('/book/booking',data);
  }
}
