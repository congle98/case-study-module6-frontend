import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status ="Please fill in the Form";
  hide = true;

  formRegister : FormGroup = new FormGroup({
    username: new FormControl('',[Validators.minLength(6),Validators.required]),
    password: new FormControl('',[Validators.minLength(6),Validators.required]),
    email: new FormControl('',[Validators.email,Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.pattern('^0[0-9]{9,10}$')]),
  })

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  createAccount() {
    console.log(this.formRegister.value);
    this.loginService.addUser(this.formRegister.value).subscribe((success) => {
      Swal.fire("Thành công","Đã tạo tài khoản thành công, Xin mời bạn kiểm tra email để xác nhận tài khoản","success");
      this.formRegister.reset();
    },(error)=>{
      Swal.fire("Thất bại","Tài khoản đã tồn tại ","error");
      this.formRegister.reset();

    })
  }
}
