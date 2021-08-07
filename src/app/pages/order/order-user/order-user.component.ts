import { ViewFeedbackComponent } from './../view-feedback/view-feedback.component';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreateFeedbackDialogComponent } from '../create-feedback-dialog/create-feedback-dialog.component';
import Swal from "sweetalert2";
@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit {

  orderList: any ;
  id: any;

  constructor(private orderService:OrderService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id=this.orderService.getUser()
    this.orderService.getOrderByUser(this.id).subscribe((data)=>{
      console.log(data);
      this.orderList = data;
    });
  }


  createFeedBack(order:any){
    this.dialog.open(CreateFeedbackDialogComponent, {
      data:order,
    });
  }
  showFeedBack(feedBack:any){
    this.dialog.open(ViewFeedbackComponent, {
      data:feedBack,
    });
  }

  accept(item: any) {
    console.log("đây là :", item);
    this.orderService.acceptStatus(item.id, item.status.id).subscribe((data) => {
      console.log("chuyen trang thai");
      Swal.fire("Thành công", "Giao dịch thành công", "success");
      this.ngOnInit();
    });
  }
}
