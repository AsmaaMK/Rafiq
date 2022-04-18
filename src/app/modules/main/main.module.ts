import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { CityComponent } from './pages/city/city.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SearchComponent } from './components/search/search.component';
import { DesktopNavbarComponent } from './components/desktop-navbar/desktop-navbar.component';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { PostComponent } from './components/post/post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    HotelComponent,
    CityComponent,
    SettingComponent,
    NotificationComponent,
    SearchComponent,
    DesktopNavbarComponent,
    MobileNavbarComponent,
    MobileHeaderComponent,
    PostComponent,
    PostPageComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
