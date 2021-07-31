import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: "register" , component: RegisterComponent},
  {path:"login",component:LoginComponent},
  {path: "" , component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

