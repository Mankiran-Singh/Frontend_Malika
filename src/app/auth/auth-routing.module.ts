import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from '../services/guards/auth/auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path:'signUp',component:SignUpComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent,canActivate:[AuthGuardService]},
  {path:'forgotPassword',component:ForgotPasswordComponent,canActivate:[AuthGuardService]},
  {path:'resetPassword/:token',component:ResetPasswordComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
