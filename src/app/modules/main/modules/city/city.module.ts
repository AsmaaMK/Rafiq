import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './city.component';
import { CityHeaderComponent } from './components/city-header/city-header.component';
import { CityNavbarComponent } from './components/city-navbar/city-navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsComponent } from './pages/posts/posts.component';
import { ImagesComponent } from './pages/images/images.component';
import { AttractionsComponent } from './pages/attractions/attractions.component';
import { HotelsComponent } from './pages/hotels/hotels.component';


@NgModule({
  declarations: [
    CityComponent,
    CityHeaderComponent,
    CityNavbarComponent,
    PostsComponent,
    ImagesComponent,
    AttractionsComponent,
    HotelsComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule
  ]
})
export class CityModule { }
