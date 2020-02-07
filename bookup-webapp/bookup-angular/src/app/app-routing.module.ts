import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapModelComponent } from './map-model/map-model.component';
import { BookingHistoryComponent } from '../app/booking-history/booking-history.component';

const routes: Routes = [
  {path: 'map' , component: MapModelComponent},
  {path: 'history', component:BookingHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
