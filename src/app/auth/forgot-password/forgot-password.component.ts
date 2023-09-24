import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/requests/auth.service';
import { Images } from 'src/files/constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  malikaLogo=Images.malikaLogo
  forgotPasswordForm:any
  constructor(private authService:AuthService,private router:Router,private toast:HotToastService){}
  ngOnInit(){
    this.forgotPasswordForm=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.email]),
     });
   }

   showErrors=false;
   getLink(){
      if(this.forgotPasswordForm.valid){
        // console.log(this.forgotPasswordForm.value);
         const {email}=this.forgotPasswordForm.value
         this.authService.forgotPassword(email).pipe(
          this.toast.observe({
            loading: 'Please wait...',
            success: 'Password reset link has been sent to your mail...!',
            error: 'Failed reset password',
          })
        ).subscribe((res)=>{
          console.log('res', res)
            this.router.navigate([`/auth/resetPassword/${res.token}`])
         })
      }else{
         this.showErrors=true;
      }
   }

  get email(){
    return this.forgotPasswordForm.get('email');
  }
}
