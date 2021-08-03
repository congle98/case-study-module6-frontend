import { Component,Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { OrderProviderService } from 'src/app/services/order-provider/order-provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  orderRequest={
    userId:"",
    providerInformationId:this.userInformation.id,
    address:"",
    hour:0,
    startTime:"",
    totalPrice:0
  }
  constructor(@Inject(MAT_DIALOG_DATA) public userInformation: any,private loginService:LoginService,
  private orderProviderService:OrderProviderService, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.orderRequest.userId = this.loginService.getUser().id;
  }

  createOrder(){
    Swal.fire({
      title:
        'Kiểm tra kỹ đơn giá và những thông tin đi kèm trước khi gửi yêu cầu',
      showCancelButton: true,
      confirmButtonText: `Đồng ý`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
       this.orderRequest.totalPrice = this.orderRequest.hour*this.userInformation.priceByHour;
      this.orderProviderService.createNewOrder(this.orderRequest).subscribe((succes)=>{
        Swal.fire("Thành công","Gửi yêu cầu thành công, chờ đối phương xác nhận","info");
      })
      }
    });
      
  }

}
