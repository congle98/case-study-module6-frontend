import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.generateToken(this.formLogin.value).subscribe((success)=>{
      Swal.fire("Thành Công","Đăng nhập thành công","success");
    },(error)=>{
      Swal.fire("Thất bại","Đăng nhập thất bại tài khoản hoặc mật khẩu sai","error");
    })
  }

}
