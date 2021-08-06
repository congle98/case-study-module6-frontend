import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
    userId: new FormControl(),
    providerInformationId: new FormControl(),

    address: new FormControl("", [
                  Validators.maxLength(100),
                  Validators.minLength(3)]),
    hour: new FormControl("1",Validators.min(1)),
    startTime: new FormControl(require),
    day: new FormControl(),
    totalPrice: new FormControl(),

  })
  userId?: any;
  providerId: any;
  providerPrice: any;
  totalPrice=0;

  constructor(private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public provider_Id: any
  ) {
  }

  ngOnInit(): void {
    this.userId = this.getUser();
    // this.formOder.controls["user"].controls["id"].setValue(this.userId);
    this.formOder.controls["userId"].setValue(this.userId);
    this.providerId= this.provider_Id;
    console.log(this.providerId)
    this.formOder.controls["providerInformationId"].setValue(this.providerId);
    this.getPriceOfProvider(this.provider_Id);

  }


  createOrder() {

    let total = this.providerPrice*this.formOder.controls["hour"].value
    this.formOder.controls["totalPrice"].setValue(total);

    this.orderService.saveOrder(this.formOder.value).subscribe((data) => {
      Swal.fire("Thành Công", "Bạn đã tạo một cuộc hẹn", "success");
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

  getPriceOfProvider(id: any){
    this.orderService.getPriceOfUser(id).subscribe(data=>{
      console.log(data)
      // let priceOfHour = parseInt(data);
      this.providerPrice = parseInt(data.toString());
    })
  }

  showTotalPrice() {
    console.log(this.providerPrice);
    console.log(this.formOder.controls["hour"].value);
    this.totalPrice = this.providerPrice*this.formOder.controls["hour"].value
    this.formOder.controls["totalPrice"].setValue(this.totalPrice)
  }
}
