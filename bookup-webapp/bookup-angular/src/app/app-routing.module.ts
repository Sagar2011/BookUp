import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapModelComponent } from './map-model/map-model.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {path: 'map' , component: MapModelComponent},
  { path: 'payment', component: PaymentComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
