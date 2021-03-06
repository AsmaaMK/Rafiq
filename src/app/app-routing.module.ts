import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { TestComponent } from './test.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/pages/unauthorized/unauthorized.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AboutUsComponent } from './shared/pages/about-us/about-us.component';
import { UnauthGuard } from './shared/guards/unauth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [UnauthGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AboutUsComponent,
    canActivate: [UnauthGuard]
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
