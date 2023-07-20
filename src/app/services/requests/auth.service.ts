import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UrlRequests} from 'src/environments/environment';
import { url } from 'src/files/constant';
/*Sending token in headers*/
const token=localStorage.getItem('token')
const httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
'Authorization': `bearer"${token}`})
};
/**************************/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router,private cookies:CookieService) { }

  SignUp(name: string| null | undefined, email: string| null | undefined, password: string| null | undefined,confirmPassword: string| null | undefined,isAdmin:boolean |null |undefined, photo:string |null|undefined): Observable<any> {
    return this.http.post(
      url + UrlRequests.signUp,
      {
        name,
        email,
        password,
        confirmPassword,
        isAdmin,
        photo
      }
    );
  }

  login(email: string| null | undefined, password: string| null | undefined): Observable<any> {
    return this.http.post(
      url + UrlRequests.login,
      {
        email,
        password
      }
    );
  }

  logOut(){
     localStorage.clear();
     sessionStorage.clear();
     this.cookies.deleteAll();
     this.router.navigate(["/auth/login"]);
  }

  googleLogin(idToken:any){
     return this.http.post(url+UrlRequests.googleLogin,{idToken:idToken})
  }

  forgotPassword(email: string| null | undefined): Observable<any> {
    return this.http.post(
      url + UrlRequests.forgotPassword,
      {
        email
      }
    );
  }

  resetPassword(password: string| null | undefined,confirmPassword:string |null|undefined): Observable<any> {
    return this.http.post(
      url + UrlRequests.forgotPassword,
      {
        password,
        confirmPassword
      }
    );
  }

}
