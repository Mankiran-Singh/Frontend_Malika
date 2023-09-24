import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/requests/auth.service';
import { Images, passwordsMatchValidator } from 'src/files/constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  malikaLogo=Images.malikaLogo
  resetPasswordForm:any
  token:any
  constructor(private route:ActivatedRoute,private router:Router,private toast:HotToastService,private authService:AuthService){}
  ngOnInit(){
    this.resetPasswordForm=new FormGroup({
      password:new FormControl('',[Validators.required,  Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),Validators.minLength(8)]),
      confirmPassword:new FormControl('',Validators.required),
     },{ validators: passwordsMatchValidator });

    this.token=this.route.snapshot.params['token']
   }

   get password(){
    return this.resetPasswordForm.get('password');
   }
   get confirmPassword(){
     return this.resetPasswordForm.get('confirmPassword');
   }

   showErrors=false
   resetPassword(){
     if(this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value)
      const {password,confirmPassword}=this.resetPasswordForm.value
      this.authService.resetPassword(password,confirmPassword,this.token).pipe(
        this.toast.observe({
          loading: 'Please wait...',
          success: 'Password has been reset, Please Login !',
          error: `Can't reset password try again !`,
        })
      ).subscribe((res)=>{
        console.log('res', res)
         this.router.navigate(['/auth/login'])
      })
     }else{
      this.showErrors=true;
       if(this.resetPasswordForm.errors?.['passwordMismatch']){
        alert("Password and confirm password does'nt match")
       }
     }
   }

   visible = true;
   changetype =true;
 
   viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
   }
}
