import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit {

  orderList: any ;
  id: any;

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.id=this.orderService.getUser()
    this.orderService.getOrderByUser(this.id).subscribe((data)=>{
      console.log(data);
      this.orderList = data;
    });
  }

}
