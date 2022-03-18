import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/pages/unauthorized/unauthorized.component';
import { AboutUsComponent } from './shared/pages/about-us/about-us.component';
import { TestComponent } from './test.component';

import { LoggingInterceptorServiceProvider } from './shared/http-interceptors/logging-interceptor.service';
import { SetHeadersInterceptorServiceProvider } from './shared/http-interceptors/set-headers-interceptor.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    TestComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // SharedModule
  ],
  providers: [
    SetHeadersInterceptorServiceProvider,
    LoggingInterceptorServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
