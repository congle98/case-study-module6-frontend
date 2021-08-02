import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  { path: 'user/:userId', component: UserDashboardComponent, canActivate:[UserGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  { path: 'error', component: ErrorComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
