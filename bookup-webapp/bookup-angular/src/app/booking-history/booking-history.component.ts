import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';


export interface PeriodicElement {
  id: string;
  start: string;
  end: string;
  distance: number;
  fare:number;
  status:string;
  driver:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 
];


@Component({
  selector: 'app-booking-history', 
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }
  displayedColumns: string[] = ['id', 'start', 'end', 'distance','fare','status','driver'];
  dataSource = ELEMENT_DATA;


}
