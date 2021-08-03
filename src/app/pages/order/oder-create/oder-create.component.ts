import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../../../services/order/order.service";
import Swal from "sweetalert2";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserResponse} from "../../../interface/user-response";


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
      id: new FormControl(1)
    }),
    address: new FormControl(),
    hour: new FormControl(),
    startTime: new FormControl(),
    day: new FormControl(),
    status: new FormGroup({
      id: new FormControl(1)
    })

  })
  id?: any;

  constructor(private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.id = this.getUser();
    this.getOrderByProvider();

  }


  createOrder() {
    this.formOder.controls["user"].controls["id"].setValue(this.id);
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
    this.orderService.getOrderByProvider(this.id).subscribe(data => {
      console.log(data);
    })

  }

}
