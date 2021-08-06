import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  oderResponse : any;
  id: any;

  constructor(private oderService: OrderService) { }

  ngOnInit(): void {
    this.oderService.getOrderById(this.id).subscribe(data=>{
      this.oderResponse = data;
    });
  }



}
