import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { LoggingInterceptorServiceProvider } from './shared/http-interceptors/logging-interceptor.service';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AsyncObservablePipeComponent } from './test.component';
import { SetHeadersInterceptorServiceProvider } from './shared/http-interceptors/set-headers-interceptor.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    AsyncObservablePipeComponent,
    AboutUsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SetHeadersInterceptorServiceProvider,
    LoggingInterceptorServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
