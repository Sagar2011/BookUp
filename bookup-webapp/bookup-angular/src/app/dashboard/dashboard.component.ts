import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapModelComponent} from '../map-model/map-model.component';
interface TimeSlot {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  _isDisabled:boolean;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  time: TimeSlot[] = [
    {value: '1pm-0', viewValue: '1pm'},
    {value: '2pm-1', viewValue: '2pm'},
    {value: '3pm-2', viewValue: '3pm'},
    {value: '4pm-3', viewValue: '4pm'},
    {value: '5pm-4', viewValue: '5pm'},
    {value: '6pm-5', viewValue: '6pm'},
    {value: '7pm-6', viewValue: '7pm'},
    {value: '8pm-7', viewValue: '8pm'},
    {value: '9pm-8', viewValue: '9pm'},
    {value: '10pm-9', viewValue: '10pm'},
    {value: '11pm-10', viewValue: '11pm'},
    {value: '12am-11', viewValue: '12am'},
    {value: '1am-12', viewValue: '1am'},
    {value: '2am-13', viewValue: '2am'},
    {value: '3pm-14', viewValue: '3am'},
    {value: '4am-15', viewValue: '4am'},
    {value: '5am-16', viewValue: '5am'},
    {value: '6am-17', viewValue: '6am'},
    {value: '7am-18', viewValue: '7am'},
    {value: '8am-19', viewValue: '8am'},
    {value: '9am-20', viewValue: '9am'},
    {value: '10am-21', viewValue: '10am'},
    {value: '11am-22', viewValue: '11am'},
    {value: '12am-23', viewValue: '12am'},

  ];

  getUrl()
  {
    return "url('https://c1.wallpaperflare.com/preview/284/720/961/2cv-citroen-road-avenue.jpg')";
    
  }
  form = new FormGroup({
    city: new FormControl({value: ' ', disabled: true},),
    tripDate:new FormControl(''),
    timeSlot:new FormControl(''),
    city_from: new FormControl({value:'Banglore', disabled: true},),
    
  });
   todaydate:Date = new Date();
  set isDisabled(value: boolean) {
    this._isDisabled = value;
    if(value) {
     this.form.controls['city_from'].disable();
    } 
   }
   show(){
     console.log("formvalue",this.form.value);
   }
   openDialog(): void {
    const dialogRef = this.dialog.open(MapModelComponent, {
      width: '750px',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
