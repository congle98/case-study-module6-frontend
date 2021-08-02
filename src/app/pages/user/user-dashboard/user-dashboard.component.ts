import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  user: any;
  userInformation: any;
  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    let id = this.activatedRoute.snapshot.params.userId;
    this.getUserInformation(id);
    
    
  }

  getUser() {
    this.user = this.loginService.getUser();
  }
  getUserInformation(id: any) {
    this.userService.getUserInformation(id).subscribe(
      (userInformation) => {
        this.userInformation = userInformation;
        console.log(this.user);
        if(this.userInformation == null){
          this.router.navigate(["/error"])
        }
      
      },
      (error) => {
        this.router.navigate(["/error"])
      }
    );
  }
}
