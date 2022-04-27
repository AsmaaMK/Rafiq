import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { AttractionsComponent } from './pages/attractions/attractions.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { ImagesComponent } from './pages/images/images.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: CityComponent,
    children: [
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'attractions',
        component: AttractionsComponent,
      },
      {
        path: 'images',
        component: ImagesComponent,
      },
      {
        path: 'hotels',
        component: HotelsComponent,
      },
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityRoutingModule {
}
