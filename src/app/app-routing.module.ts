import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ErrorComponent } from './components/error/error.component';
import { UserUpdateProfileComponent } from './pages/user/user-update-profile/user-update-profile.component';

import {ProviderEditComponent} from "./pages/provider/provider-edit/provider-edit.component";
import {OderCreateComponent} from "./pages/order/oder-create/oder-create.component";
import {ListComponent} from "./pages/order/list/list.component";
import { OrderUserComponent } from './pages/order/order-user/order-user.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { ViewsOrderComponent } from './pages/admin/views-order/views-order.component';
import {OrderProviderComponent} from "./pages/order/order-provider/order-provider.component";


const routes: Routes = [
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path:"home",
    component:HomeComponent
  }
  ,

  {
    path: 'login',
    component: LoginComponent,
  },

  { path: 'user/:userId', component: UserDashboardComponent,

  },
  {
    path:"user/update/:userId",component: UserUpdateProfileComponent,
    canActivate:[UserGuard],
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children:[{
      path: 'viewsUser',
      component:ViewUsersComponent
    },
    {
      path: 'viewsOrders',
      component:ViewsOrderComponent
    }]
  },
  { path: 'error', component: ErrorComponent },
  { path: 'provider', component: ProviderEditComponent},
  { path: 'order', component: OrderProviderComponent},
  { path: 'order2', component:OrderUserComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
