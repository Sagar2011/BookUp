import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private http: HttpClient) { }


  getStatus(){
    return this.subject.asObservable();
  }

  pushStatus(data){
    this.subject.next(data);
  }
  getDrivers(): Observable<any> {
    return this.http.get(`/book/driver`);
  }
}
