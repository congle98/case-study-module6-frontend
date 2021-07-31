import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status ="Please fill in the Form";


  formRegister : FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl('bad@', Validators.email),
    phone: new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
  }

  createAccount() {
    console.log(this.formRegister.value);
  }
}
