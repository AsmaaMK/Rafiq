import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './pages/images/images.component';
import { MapComponent } from './pages/map/map.component';
import { PostsComponent } from './pages/posts/posts.component';
import { VideosComponent } from './pages/videos/videos.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'videos',
        component: VideosComponent,
      }, 
      {
        path: 'images',
        component: ImagesComponent,
      }, 
      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
