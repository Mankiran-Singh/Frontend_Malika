import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from '../services/guards/adminGuard/admin-guard.service';
import { CourseGuardService } from '../services/guards/courseGuard/course-guard.service';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'',component:HomeComponent,canActivate:[CourseGuardService]},
  {path:'admin',component:AdminComponent,canActivate:[AdminGuardService,CourseGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
