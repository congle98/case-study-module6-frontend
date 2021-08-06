import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-feedback-dialog',
  templateUrl: './create-feedback-dialog.component.html',
  styleUrls: ['./create-feedback-dialog.component.css']
})
export class CreateFeedbackDialogComponent implements OnInit {
  createFeedBackRequest={
    orderId:this.order.id,
    starRating:0,
    description:""
  }

  constructor(@Inject(MAT_DIALOG_DATA) public order: any, private feedBackService:FeedbackService) { }

  ngOnInit(): void {


  }

  createFeedBack(){
    this.feedBackService.createFeedBack(this.createFeedBackRequest).subscribe((data)=>{
      Swal.fire("Thành công","Gửi phản hồi thành công, phản hồi của bạn sẽ được duyệt trước khi hiển thị","success");
      this.order.feedback = data;
    })
  }

}
