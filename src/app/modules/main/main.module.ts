import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SearchComponent } from './pages/search/search.component';
import { DesktopNavbarComponent } from './components/desktop-navbar/desktop-navbar.component';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PossissionNotificationDirective } from './components/notification/possission-notification.directive';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    NotificationComponent,
    SearchComponent,
    DesktopNavbarComponent,
    MobileNavbarComponent,
    MobileHeaderComponent,
    PostPageComponent,
    PossissionNotificationDirective,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MainModule { }
