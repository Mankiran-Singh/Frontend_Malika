import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/requests/auth.service';
import { Images } from 'src/files/constant';
import { passwordsMatchValidator } from 'src/files/constant';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private authService:AuthService,private toast:HotToastService,private router:Router){}

  malikaLogo=Images.malikaLogo
  signUpForm:any
  ngOnInit(){
    this.signUpForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required,  Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),Validators.minLength(8)]),
      confirmPassword:new FormControl('',Validators.required),
      // isAdmin:new FormControl(false),
      // photo: new FormControl('', [Validators.required]),
      // fileSource:new FormControl('',[Validators.required])
     },{ validators: passwordsMatchValidator });
   }

  //  get photo(){
  //   return this.signUpForm.get('photo');
  // }
  // onFileChange(event:any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.signUpForm.patchValue({
  //       fileSource: file
  //     });
  //   }
  // }
   showErrors=false;

   //Signing Up the User
   signUp(){
    if(this.signUpForm.valid){
      // console.log(this.signUpForm.value);
      // var reader = new FileReader();
      // reader.onload = () => {  
      //    this.signUpForm.value.photo=reader.result;  
      // };  
      // reader.readAsDataURL(this.signUpForm.value.fileSource);
      const {name,email,password,confirmPassword}=this.signUpForm.value
       this.authService.SignUp(name,email,password,confirmPassword).pipe(
         this.toast.observe({
           loading: 'Please wait...',
           success: 'SignUp successful!',
           error: 'Either email already exists or Form is invalid',
         })
       ).subscribe(
         (res:any)=>{
           console.log("====>",res)
           //localStorage.setItem('token',res.data.token)
           this.signUpForm.reset();
           this.router.navigate(['/auth/login']);
         }
       );
      }else{
        this.showErrors=true;
        if(this.signUpForm.errors?.['passwordMismatch']){
           alert("Password and confirm password does'nt match")
        }
      }
 
   }

   get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  visible = true;
   changeType =true;
 
   viewPass(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
   }
}
