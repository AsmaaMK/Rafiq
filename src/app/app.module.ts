import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { LoggingInterceptorServiceProvider } from './shared/http-interceptors/logging-interceptor.service';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { AsyncObservablePipeComponent } from './pipe.component';
import { SetHeadersInterceptorServiceProvider } from './shared/http-interceptors/set-headers-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    AsyncObservablePipeComponent
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
