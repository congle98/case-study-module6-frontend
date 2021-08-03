import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../../../services/order/order.service";
import Swal from "sweetalert2";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserResponse} from "../../../interface/user-response";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-oder-create',
  templateUrl: './oder-create.component.html',
  styleUrls: ['./oder-create.component.css']
})
export class OderCreateComponent implements OnInit {
  formOder: any = new FormGroup({
    id: new FormControl(),
    user: new FormGroup({
      id: new FormControl()

    }),
    provider: new FormGroup({
      id: new FormControl()
    }),
    address: new FormControl(),
    hour: new FormControl(),
    startTime: new FormControl(),
    day: new FormControl(),
    status: new FormGroup({
      id: new FormControl(1)
    })

  })
  userId?: any;
  providerId: any;

  constructor(private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public provider_Id: any
  ) {
  }

  ngOnInit(): void {
    this.userId = this.getUser();
    this.formOder.controls["user"].controls["id"].setValue(this.userId);
    this.providerId= this.provider_Id;
    console.log(this.providerId)
    this.formOder.controls["provider"].controls["id"].setValue(this.providerId);


  }


  createOrder() {
    // this.formOder.controls["user"].controls["id"].setValue(this.id);
    // this.formOder.controls["provider"].controls["id"].setValue(this.id);
    console.log(this.formOder.value);

    this.orderService.saveOrder(this.formOder.value).subscribe((data) => {
      Swal.fire("Thành Công", "Bạn đã tạo một Order", "success");
    })


  }

  getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr !== null) {
      let user = JSON.parse(userStr)
      console.log(user.id)
      return user.id;

    } else {
      // this.logout();
      return null;
    }
  }

  getOrderByProvider() {
    this.orderService.getOrderByProvider(this.userId).subscribe(data => {
      console.log(data);
    })

  }

}
