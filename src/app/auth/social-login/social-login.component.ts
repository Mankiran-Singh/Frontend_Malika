import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Images } from 'src/files/constant';
import { GOOGLE_LOGIN_URL } from 'src/environments/environment';
import { EventEmitterService } from 'src/app/services/events/event-emitter.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/services/requests/auth.service';
// import { GoogleSigninButton } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent {
   microsoftIcon=Images.microsoftIcon
   private accessToken = '';
   constructor(private authService:AuthService,private http:HttpClient,private router:Router,private event:EventEmitterService,private socialAuthService: SocialAuthService) { }
  
   user: SocialUser | undefined;
   loggedIn: boolean | undefined;
   ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.googleLogin(user.idToken).subscribe((res)=>{
        localStorage.setItem("googleIdToken",user.idToken) ;
        this.router.navigate(['/home']);
        console.log("Google Login success",res);
      })
      this.loggedIn = (user != null);
    });
  }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }
  
  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }

  // getGoogleCalendarData(): void {
  //   if (!this.accessToken) return;
  //   this.http
  //     .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //       headers: { Authorization: `Bearer ${this.accessToken}` },
  //     })
  //     .subscribe((events: any) => {
  //       alert('Look at your console');
  //       console.log('events', events);
  //     });
  // }

  signInWithFB() {
    window.open(`${GOOGLE_LOGIN_URL}/auth/facebook/callback`,"_self")
  }

  signInWithMicrosoft(){
    window.open(`${GOOGLE_LOGIN_URL}/auth/microsoft`,"_self")
  }
}
