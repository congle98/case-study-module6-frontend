import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formLogin : FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl() 
  })

  constructor(private loginService: LoginService , private snack: MatSnackBar, private router:Router ) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.formLogin.value).subscribe((token:any)=>{
      Swal.fire("Thành Công","Đăng nhập thành công","success");
        this.loginService.setTokenToStorage(token.jwt);
        this.loginService.getCurrentUser().subscribe((user:any)=>{
           this.loginService.setUser(user);
        
           if(user.roles[0].authority=="USER"){
             this.router.navigate(["/user"]);
             this.loginService.loginStatusSubject.next(true);
           }
           else if(user.roles[0].authority=="ADMIN"){
            this.router.navigate(["/admin"]);
              this.loginService.loginStatusSubject.next(true);
           }
        })
    },(error)=>{
      Swal.fire("Thất bại","Đăng nhập thất bại tài khoản hoặc mật khẩu sai","error");
    })
  }

}
