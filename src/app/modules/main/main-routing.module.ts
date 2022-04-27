import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { UserInfoResolver } from './resolvers/user-info.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile/:username',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        resolve: { userInfo: UserInfoResolver },
      },
      {
        path: 'city/:cityId',
        loadChildren: () =>
          import('./modules/city/city.module').then((m) => m.CityModule),
      },
      {
        path: 'post/:postId',
        component: PostPageComponent,
        resolve: { userInfo: UserInfoResolver },
      },
      {
        path: 'trip',
        loadChildren: () =>
          import('./modules/trip/trip.module').then((m) => m.TripModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
