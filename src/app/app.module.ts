import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './core/services/common/jwt.interceptor';
import { ErrorInterceptor } from './core/services/common/error.interceptor ';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
