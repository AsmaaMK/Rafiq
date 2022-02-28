import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncObservablePipeComponent } from './pipe.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: 'newsfeed',
    loadChildren: () => import('./newsfeed/newsfeed.module').then(m => m.NewsfeedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'pipe',
    component:  AsyncObservablePipeComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
