import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapModelComponent } from './map-model/map-model.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LoginDialogBoxComponent } from 'src/app/login-dialog-box/login-dialog-box.component';
import { DriverComponent } from 'src/app/driver/driver.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {path: 'map' , component: MapModelComponent},
  {path: '', component: DashboardComponent},
  {path: 'search', component: DashboardComponent},
  { path: 'login', component: LoginDialogBoxComponent },
  { path: 'book', component: DriverComponent },
  { path: 'payment', component: PaymentComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
