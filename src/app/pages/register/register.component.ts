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
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl('', Validators.email),
    phone: new FormControl(),
  })

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  createAccount() {
    this.loginService.addUser(this.formRegister.value).subscribe((success) => {
      Swal.fire("Thành công","Đã tạo tài khoản thành công","success");
    })
  }
}
