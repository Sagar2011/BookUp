import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public TripData : any;
  drivers: any;
  constructor(private book:BookingService) { }

  ngOnInit() {
    this.TripData = sessionStorage.getItem('tripData');
    console.log('Trip data from dashboard::',this.TripData);
    this.book.getDrivers().subscribe(data=>{
      this.drivers = data;
      console.log(this.drivers);
    });
  }
}
