import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Images, passwordsMatchValidator } from 'src/files/constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  malikaLogo=Images.malikaLogo
  resetPasswordForm:any
  ngOnInit(){
    this.resetPasswordForm=new FormGroup({
      password:new FormControl('',[Validators.required,  Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),Validators.minLength(8)]),
      confirmPassword:new FormControl('',Validators.required),
     },{ validators: passwordsMatchValidator });
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
