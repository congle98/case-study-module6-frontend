import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreateFeedbackDialogComponent} from "../create-feedback-dialog/create-feedback-dialog.component";
import {ViewFeedbackComponent} from "../view-feedback/view-feedback.component";
import {LoginService} from "../../../services/login/login.service";


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  oderResponse : any;
  id: any;

  statusEdit = false;
  idStatus:any;
  currentDay="2021-08-08";


  constructor(private oderService: OrderService,
              private active: ActivatedRoute,
              public dialog: MatDialog,
              public loginService: LoginService) { }

  ngOnInit(): void {



    this.id = this.active.snapshot.params.id;
    this.oderService.getOrderById(this.id).subscribe(data=>{
      this.oderResponse = data;
      console.log(this.oderResponse)
      this.idStatus = this.oderResponse.status.id;
      // console.log(this.idStatus)


    });


  }

  getDate(){
    let today = new Date();
    let year= today.getFullYear();
    let month= today.getMonth();
    let monthStr ="";
    let day= today.getDate();
    let daythStr="";
    if(month<10){
      monthStr ="0"+ (month+1).toString();
    }
    if(day<10){
      daythStr="0"+ day.toString();
    }
    let dayString =year +'-'+ monthStr +'-'+daythStr ;
    this.currentDay=dayString;
    console.log(this.currentDay);
  }

  cancel() {
    this.oderService.cancelOrder(this.id, this.idStatus).subscribe(()=>{
      Swal.fire("Hủy thành công", "Bạn đã hủy đơn", "success");
      this.ngOnInit();
    })
  }

  editInf() {
    this.getDate();
    this.statusEdit=true;


  }
  editOrder() {
    console.log(this.oderResponse);
    if(this.oderResponse.totalPrice > this.oderResponse.user.money){
      Swal.fire("Thất bại", "Giá trị đơn hàng cao hơn số tiền bạn có", "error");
      this.ngOnInit();
    }else{
     let orderEdit ={
        id: this.oderResponse.id,
        user: { id: this.oderResponse.user.id},
        provider: { id: this.oderResponse.provider.id},
        address: this.oderResponse.address,
        hour: this.oderResponse.hour,
        startTime: this.oderResponse.startTime,
        day: this.oderResponse.day,
        totalPrice: this.oderResponse.totalPrice,
        status: {id: this.oderResponse.status.id}
      }

      this.oderService.editOrder(orderEdit).subscribe(()=>{
        this.statusEdit=false
        Swal.fire("Thành công", "Đơn dã được sửa thành công", "success");
        this.ngOnInit();
      })
    }

  }


  payment() {
    this.oderResponse.totalPrice=this.oderResponse.provider.priceByHour*this.oderResponse.hour;
  }

  complete() {
    this.oderService.acceptStatus(this.id, this.idStatus).subscribe(()=>{
      Swal.fire("Thành công", "Đơn của bạn đã hoàn thành", "success");
      this.ngOnInit();
    })
  }

  createFeedBack(){
    this.dialog.open(CreateFeedbackDialogComponent, {
      data: this.oderResponse
    });
    window.onload;
  }
  reply() {
    this.oderService.acceptStatus(this.id, this.idStatus).subscribe(()=>{
      Swal.fire("Thành công", "Đơn của bạn đã hoàn thành", "success");
      this.ngOnInit();
    })
  }

  showFeedBack(feedBack:any){
    this.dialog.open(ViewFeedbackComponent, {
      data:feedBack
    });
  }

  getAccount(){
    let userStr = localStorage.getItem("user");
    if (userStr !== null) {
      let user = JSON.parse(userStr)
      // console.log(user.id)
      return user.id;

    } else {
      // this.logout();
      return null;
    }
  }

  accept() {
    this.oderService.acceptStatus(this.id, this.idStatus).subscribe(()=>{
      Swal.fire("Thành công", "Giao dịch thành công", "success");
      this.ngOnInit()
    })


  }

  pament() {
    console.log(this.idStatus)
    if (this.idStatus == 3) {
      const paymentRequest = {
        userId: this.oderResponse.user.id,
        providerId: this.oderResponse.provider.id,
        money: this.oderResponse.totalPrice
      }
      // console.log(paymentRequest);
      this.oderService.paymentOrder(paymentRequest).subscribe(data => {
        console.log("da cong tien");
        this.accept();
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          this.loginService.loginStatusSubject.next(true);


        });
      });
    }
  }

  printInput(inputAdd: any) {
    console.log(inputAdd);

  }
}
