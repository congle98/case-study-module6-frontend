import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user: any;
  userInformation: any;
  userInformationAvatar: any;
  checkUser = false;
  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    let id = this.activatedRoute.snapshot.params.userId;
    this.getUserInformation(id);
  }

  getUser() {
    if (this.loginService.getUser() != null) {
      this.user = this.loginService.getUser();
    }
  }
  getUserInformation(id: any) {
    this.userService.getUserInformation(id).subscribe(
      (userInformation) => {
        this.userInformation = userInformation;
        if (userInformation == null) {
          this.router.navigate(['/error']);
        } else {
          console.log(userInformation);
          this.checkUserInit();
          this.getUserInformationAvatar(userInformation);
        }
      },
      (error) => {
        this.router.navigate(['/error']);
      }
    );
  }
  checkUserInit() {
    if (this.user != null) {
      if (this.user.id == this.userInformation.user.id) {
        this.checkUser = true;
      } else {
        this.addViews(this.userInformation.id);
      }
    }
  }

  addViews(id: any) {
    this.userService.setView(id);
  }

  getUserInformationAvatar(userInformation: any) {
    if (userInformation != null) {
      for (let i = 0; userInformation.image.length; i++) {
        if (userInformation.image[i].categoryImage.name == 'Avatar') {
          this.userInformationAvatar = userInformation.image[i].url;
        }
      }
    }
  }
}
