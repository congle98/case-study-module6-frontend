import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FeedbackDetailDialogComponent } from '../feedback-detail-dialog/feedback-detail-dialog.component';
@Component({
  selector: 'app-views-order',
  templateUrl: './views-order.component.html',
  styleUrls: ['./views-order.component.css']
})
export class ViewsOrderComponent implements OnInit {
  orders:any;
  page=0;
  totalPages=0;
  constructor(private adminService:AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this. getAllOrders();
  }

  openFeedBackDialog(feedBack:any) {
    this.dialog.open(FeedbackDetailDialogComponent, {
      data: feedBack,
    });
  }

  getAllOrders(){
    this.adminService.getAllOrders(this.page).subscribe((data:any)=>{
      this.orders = data.content;
      this.totalPages =  data.totalPages;
      console.log( this.orders);
    })
  }
  backPage(){
    this.page-=1;
    this.getAllOrders();
  }
  nextPage(){
    this.page+=1;
    this.getAllOrders();
  }

}
