import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/requests/auth.service';
import { Images } from 'src/files/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  malikaLogo=Images.malikaLogo

  constructor(private authService:AuthService,private toast:HotToastService,private router:Router){}

  loginForm:any
  ngOnInit(){
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required,  Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )]),
     });
   }

   showErrors=false;

   //Signing Up the User
   login(){
    if(this.loginForm.valid){
      const {email,password,confirmPassword}=this.loginForm.value
       this.authService.login(email,password).pipe(
         this.toast.observe({
           loading: 'Please wait...',
           success: 'Login successful!',
           error: 'Invalid Details',
         })
       ).subscribe(
         (res:any)=>{
           console.log("====>",res)
           localStorage.setItem('token',res.data.token)
           if(res.data.isAdmin===true){
              localStorage.setItem('admin',res.data.isAdmin)
              this.router.navigate(['/home/admin']);
           }
           this.loginForm.reset();
           this.router.navigate(['/home']);
         }
       );
      }else{
        this.showErrors=true;
      }
 
   }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  visible = true;
   changetype =true;
 
   viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
   }
}
