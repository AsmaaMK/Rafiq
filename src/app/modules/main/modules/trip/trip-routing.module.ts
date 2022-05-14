import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';
import { TripDetailsComponent } from './pages/trip-details/trip-details.component';
import { TripsFilterComponent } from './pages/trips-filter/trips-filter.component';
import { TripComponent } from './trip.component';

const routes: Routes = [
  {
    path: '',
    component: TripComponent,
    children: [
      {
        path: '',
        component: TripsFilterComponent,
      },
      {
        path: 'create-trip',
        component: CreateTripComponent,
      },
      {
        path: ':tripId',
        component: TripDetailsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripRoutingModule {}
