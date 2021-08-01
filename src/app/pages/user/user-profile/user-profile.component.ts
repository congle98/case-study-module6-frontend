import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  userInformation: any;
  isLogin = false;
  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogin = this.loginService.isLoggedIn();
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
        console.log(this.userInformation);
        if(this.userInformation == null){
          this.router.navigate(["/error"])
        }
        this.setView();
      },
      (error) => {
        this.router.navigate(["/error"])
      }
    );
  }

  setView(){
    if(!this.user){
      this.userService.setView(this.userInformation.id).subscribe();
    }
    else if(this.user.id!=this.userInformation.user.id){
      this.userService.setView(this.userInformation.id).subscribe();
    }
  }
}
