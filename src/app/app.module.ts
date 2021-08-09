import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';


//material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';

//http client
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './guards/auth.interceptor';
import { ProviderListComponent } from './pages/provider/provider-list/provider-list.component';
import { ProviderCreateComponent } from './pages/provider/provider-create/provider-create.component';
import { ProviderEditComponent } from './pages/provider/provider-edit/provider-edit.component';
import { ProviderEditStatusComponent } from './pages/provider/provider-edit-status/provider-edit-status.component';
import { ProviderEditPriceComponent } from './pages/provider/provider-edit-price/provider-edit-price.component';

import { ErrorComponent } from './components/error/error.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';


import {OderCreateComponent} from "./pages/order/oder-create/oder-create.component";
import { ListComponent } from './pages/order/list/list.component';



import { UserUpdateProfileComponent } from './pages/user/user-update-profile/user-update-profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { UserRegisterProviderDialogComponent } from './pages/user/user-register-provider-dialog/user-register-provider-dialog.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { OrderDialogComponent } from './pages/user/order-dialog/order-dialog.component';
import { OrderUserComponent } from './pages/order/order-user/order-user.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { ViewsOrderComponent } from './pages/admin/views-order/views-order.component';
import { FeedbackDetailDialogComponent } from './pages/admin/feedback-detail-dialog/feedback-detail-dialog.component';
import { CreateFeedbackDialogComponent } from './pages/order/create-feedback-dialog/create-feedback-dialog.component';
import { ViewFeedbackComponent } from './pages/order/view-feedback/view-feedback.component';
import { OrderProviderComponent } from './pages/order/order-provider/order-provider.component';
import { OrderDetailComponent } from './pages/order/order-detail/order-detail.component';
import { ChatComponent } from './pages/chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,


    ProviderListComponent,
    ProviderCreateComponent,
    ProviderEditComponent,
    ProviderEditStatusComponent,
    ProviderEditPriceComponent,
    ErrorComponent,
    UserDashboardComponent,

    UserUpdateProfileComponent,
    UserRegisterProviderDialogComponent,


    UserUpdateProfileComponent,
    UserDashboardComponent,
    OderCreateComponent,
    ListComponent,
    OrderDialogComponent,
    OrderUserComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    ViewUsersComponent,
    ViewsOrderComponent,
    FeedbackDetailDialogComponent,
    CreateFeedbackDialogComponent,
    ViewFeedbackComponent,
    OrderUserComponent,
    OrderProviderComponent,
    OrderDetailComponent,
    ChatComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    //material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatDialogModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
  ],
  entryComponents:[UserRegisterProviderDialogComponent],
  providers: [
    authInterceptorProviders,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
