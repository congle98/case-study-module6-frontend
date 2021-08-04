import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  orderList: any ;
  id: any;

  constructor(private oderService: OrderService,
              private route: Router) { }

  ngOnInit(): void {
    this.id=this.oderService.getUser()
    this.oderService.getOrderByProvider(this.id).subscribe((data)=>{
      console.log(data);
      this.orderList = data;
    });
  }

  accept(id:any, status: any) {
    this.oderService.acceptStatus(id, status).subscribe((data)=>{
      // this.route.navigateByUrl("/order");

      Swal.fire("Thành Công", "Bạn đã tạo một Order", "success");
      this.ngOnInit();
    })

  }

  decline(id:any, status: any) {
    this.oderService.cancelOrder(id, status).subscribe((data)=>{
      // this.route.navigateByUrl("/order");

      Swal.fire("Hủy thành công", "Bạn đã từ chối nhận đơn", "success");
      this.ngOnInit();
    })

  }
}
