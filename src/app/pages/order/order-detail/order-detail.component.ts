import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  oderResponse : any;
  id: any;

  constructor(private oderService: OrderService,
              private active: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.active.snapshot.params.id;
    this.oderService.getOrderById(this.id).subscribe(data=>{
      this.oderResponse = data;
      console.log(this.oderResponse)
    });
  }



}
