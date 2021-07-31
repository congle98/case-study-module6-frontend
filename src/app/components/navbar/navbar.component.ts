import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any;
 

  

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
 
    this.loginService.loginStatusSubject.asObservable().subscribe((data:any)=>{
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser();
    })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(["/login"]);
   

  }

}
