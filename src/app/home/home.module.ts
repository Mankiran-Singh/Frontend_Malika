import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SpinnerInterceptorService } from './../services/interceptors/spinner-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { CookieService } from 'ngx-cookie-service';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
}from '@abacritt/angularx-social-login';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SocialLoginModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
             '666319182809-maie3ccu0nkimt9ovq4608m6ntd8dich.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1044650633585535')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }]
})
export class HomeModule { }
