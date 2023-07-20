import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EventEmitterService } from 'src/app/services/events/event-emitter.service';
import { AuthService } from 'src/app/services/requests/auth.service';
import { GOOGLE_LOGIN_URL } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(private event:EventEmitterService,private http:HttpClient,private authService: AuthService,private socialAuthService:SocialAuthService){}

  ngOnInit(){
    
  }

  logOut(){
      this.socialAuthService.signOut().then(()=>{
        localStorage.clear();
      });
      this.authService.logOut();
  }
}