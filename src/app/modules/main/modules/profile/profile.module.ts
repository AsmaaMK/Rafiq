import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ImagesComponent } from './pages/images/images.component';
import { VideosComponent } from './pages/videos/videos.component';
import { MapComponent } from './pages/map/map.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    NavbarComponent,
    PostsComponent,
    ImagesComponent,
    VideosComponent,
    MapComponent,
    EditInfoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
