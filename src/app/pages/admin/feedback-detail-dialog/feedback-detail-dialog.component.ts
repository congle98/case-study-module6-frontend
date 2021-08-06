import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-feedback-detail-dialog',
  templateUrl: './feedback-detail-dialog.component.html',
  styleUrls: ['./feedback-detail-dialog.component.css']
})
export class FeedbackDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public feedBack: any, private adminService:AdminService,private router: Router) { }

  ngOnInit(): void {
  }

  changeStatusFeedBack(feedbackId:any){
 
    this.adminService.changeStatusFeedBack(feedbackId).subscribe((success)=>{
      Swal.fire("Thành Công","Thay đổi trạng thái báo cáo thành công","success");
      this.feedBack.confirm=!this.feedBack.confirm;
    })
  }
}
