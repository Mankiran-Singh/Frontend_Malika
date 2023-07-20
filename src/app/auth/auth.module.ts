import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { SocialLoginComponent } from './social-login/social-login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptorService } from './../services/interceptors/spinner-interceptor.service';
import { HotToastModule } from '@ngneat/hot-toast';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
}from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    SocialLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    SpinnerComponent,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
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
    }
  ],
})
export class AuthModule { }
