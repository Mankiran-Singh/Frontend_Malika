import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router:Router) { }
  canActivate():boolean{
    let admin=localStorage.getItem('admin')
    if(admin){
       return true;
    }else{
       this.router.navigate(['/home'])
       return false;
    }
 }
}
