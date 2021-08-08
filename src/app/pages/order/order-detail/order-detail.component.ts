import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  oderResponse : any;
  id: any;

  statusEdit = false;

  constructor(private oderService: OrderService,
              private active: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.active.snapshot.params.id;
    this.oderService.getOrderById(this.id).subscribe(data=>{
      this.oderResponse = data;
      console.log(this.oderResponse)
    });
  }


  cancel() {
    this.oderService.cancelOrder(this.id, this.oderResponse.status).subscribe(()=>{
      Swal.fire("Hủy thành công", "Bạn đã hủy đơn", "success");
    })
  }

  editInf() {
    this.statusEdit=true;

  }
  editOrder() {
    console.log(this.oderResponse);
    let orderEdit ={
      id: this.oderResponse.id,
      user: { id: this.oderResponse.user.id},
      provider: { id: this.oderResponse.provider.id},
      address: this.oderResponse.address,
      hour: this.oderResponse.hour,
      startTime: this.oderResponse.startTime,
      day: this.oderResponse.day,
      totalPrice: this.oderResponse.totalPrice,
      status: {id: this.oderResponse.status.id}
    }

    this.oderService.editOrder(orderEdit).subscribe(()=>{
      this.statusEdit=false
      Swal.fire("Thành công", "Đơn dã được sửa thành công", "success");
    })
  }


  payment() {
    this.oderResponse.totalPrice=this.oderResponse.provider.priceByHour*this.oderResponse.hour;
  }
}
