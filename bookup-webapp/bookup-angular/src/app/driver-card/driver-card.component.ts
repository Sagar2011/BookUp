import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent implements OnInit {
  @Input() item: any;
  rate: number;
  cr: any;
  constructor() { }
  price: number;
  ngOnInit() {
    // let x = parseFloat(this.rate);
    this.rate = this.item.rating;
    this.cr = this.rate*20 +'%';
    this.price = this.item.driverprice;
  }

}
