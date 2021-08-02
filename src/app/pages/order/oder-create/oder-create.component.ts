import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../../../services/order/order.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-oder-create',
  templateUrl: './oder-create.component.html',
  styleUrls: ['./oder-create.component.css']
})
export class OderCreateComponent implements OnInit {
  formOder: any = new FormGroup({
    id: new FormControl(),
    user: new FormGroup({
      id: new FormControl(1)

    }),
    provider: new FormGroup({
      id: new FormControl(2)
    }),
    address: new FormControl(),
    hour: new FormControl(),
    startTime: new FormControl(),
    day: new FormControl(),
    status: new FormGroup({
      id: new FormControl(1)
    })

  })

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }


  createOrder() {
        console.log(this.formOder.value);
        this.orderService.saveOrder(this.formOder.value).subscribe((data)=>{
          Swal.fire("Thành Công","Bạn đã tạo một Order","success");
        }, error => {
          Swal.fire("Thất Bại","Order chưa được tạo","error");
        })


  }
}
