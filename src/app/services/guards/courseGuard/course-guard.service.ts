import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourseGuardService {

  constructor(private router:Router) { }
  canActivate():boolean{
    const token=localStorage.getItem('token');
    const idToken=localStorage.getItem('googleIdToken');
    if(!token || !idToken){
       this.router.navigate(['/auth/login']);
       return false;
    }else{
       return true;
    }
  }
}
