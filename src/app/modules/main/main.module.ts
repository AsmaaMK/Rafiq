import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { CityComponent } from './pages/city/city.component';
import { SettingComponent } from './pages/setting/setting.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    HotelComponent,
    CityComponent,
    SettingComponent,
    SidebarComponent,
    NotificationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
