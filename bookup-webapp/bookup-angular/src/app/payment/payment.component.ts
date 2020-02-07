import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-payment',
//   template: `<div>
//    <p>Today is {{today | date}}</p>
//    <p>Or if you prefer, {{today | date:'fullDate'}}</p>
//    <p>The time is {{today | date:'h:mm a z'}}</p>
//  </div>`,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PaymentComponent implements OnInit {
  public cardForm: FormGroup;
  
  // today: number = Date.now();
  constructor() { }
  isActive = false;
  ngOnInit() {
    // console.log('date::',this.today);
    this.cardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.minLength(16)]),
      // date: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }
  currentDate: Date = new Date();
  public hasError = (controlName: string, errorName: string) =>{
    return this.cardForm.controls[controlName].hasError(errorName);
  }
  date= new FormControl(moment(),[Validators.required]);

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    console.log('year::',ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    console.log('month::',ctrlValue);
  }
  public onCancel = () => {
    console.log('cancel');
  }
 
  public payment = (cardFormValue) => {
    if (this.cardForm.valid) {
      console.log('inside payment::',cardFormValue);
    }
  }
 
}
