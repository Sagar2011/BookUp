import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<any> {
    return this.http.get(`/book/driver`);
  }
  postUser(user:any): Observable<any> {
    console.log("inside postuser");
    return this.http.post<any>(`/book/tripDetails`, user)
      
  }
}
