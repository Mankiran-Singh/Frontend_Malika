import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private router:Router) { }

  canActivate():boolean{
     let token=localStorage.getItem('token')
     let idToken=localStorage.getItem('googleIdToken')
     if(token || idToken){
        this.router.navigate(['/home'])
        return false;
     }else{
         return true;
     }
  }
}
