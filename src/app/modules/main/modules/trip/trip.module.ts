import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';
import { TripsFilterComponent } from './pages/trips-filter/trips-filter.component';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';
import { TripDetailsComponent } from './pages/trip-details/trip-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TripComponent,
    TripsFilterComponent,
    CreateTripComponent,
    TripDetailsComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    SharedModule
  ]
})
export class TripModule { }
