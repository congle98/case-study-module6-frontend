import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';



//material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling';

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
import { UserProfileDetailComponent } from './pages/user/user-profile-detail/user-profile-detail.component';
import { UserUpdateProfileComponent } from './pages/user/user-update-profile/user-update-profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,

    ProviderListComponent,
    ProviderCreateComponent,
    ProviderEditComponent,
    ProviderEditStatusComponent,
    ProviderEditPriceComponent,
    ErrorComponent,
    UserDashboardComponent,
    UserProfileDetailComponent,
    UserUpdateProfileComponent

  
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
    FormsModule

  ],
  providers: [authInterceptorProviders,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
