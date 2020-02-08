import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    console.log('city----->', JSON.parse(this.TripData))
    const tripInfo=JSON.parse(this.TripData);
    console.log('dest-->',tripInfo.city);
    this.booking_form.controls['city'].setValue(tripInfo.city);
    this.booking_form.controls['distance'].setValue(tripInfo.distance.toFixed(2));
    this.booking_form.controls['tripDate'].setValue(tripInfo.tripDate);
    this.booking_form.controls['timeSlot'].setValue(tripInfo.timeSlot);

    this.book.getDrivers().subscribe(data=>{
      this.drivers = data;
      console.log(this.drivers);
    });
  }
  booking_form = new FormGroup({
    city: new FormControl({value:'', disabled: true},),
    tripDate:new FormControl({value:'', disabled: true},),
    timeSlot:new FormControl({value:'', disabled: true},),
    city_from: new FormControl({value:'Banglore', disabled: true},),
    distance:new FormControl({value:'', disabled: true},),
  });


}
