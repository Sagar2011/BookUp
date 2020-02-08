import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public TripData : any;
  constructor() { }

  ngOnInit() {
    this.TripData = sessionStorage.getItem('tripData');
    console.log('Trip data from dashboard::',this.TripData);
  }

}
