import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  orderList: any ;
  id: any;
  constructor(private oderService: OrderService) { }

  ngOnInit(): void {
    this.id=this.oderService.getUser()
    this.oderService.getOrderByProvider(this.id).subscribe((data)=>{
      console.log(data);
      this.orderList = data;
    });
  }

}
