import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister : FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
  }

  createAccount() {
    console.log(this.formRegister.value);
  }
}
