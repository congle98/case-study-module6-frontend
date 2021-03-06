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

  avatarUrl:any ;
  avatarProvider:any ;


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


      // this.avatarUrl = this.oderResponse.user.image[0].url
      // this.avatarProvider = this.oderResponse.provider.image[0].url
      this.getAvatarProvider();
      this.getAvatar();

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
    }else monthStr= (month+1).toString();
    if(day<10){
      daythStr="0"+ day.toString();
    }else daythStr= day.toString();

    let dayString =year +'-'+ monthStr +'-'+daythStr ;
    this.currentDay=dayString;
    console.log(this.currentDay);
  }

  cancel() {
    this.oderService.cancelOrder(this.id, this.idStatus).subscribe(()=>{
      Swal.fire("H???y th??nh c??ng", "B???n ???? h???y ????n", "success");
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
      Swal.fire("Th???t b???i", "Gi?? tr??? ????n h??ng cao h??n s??? ti???n b???n c??", "error");
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
        status: {id: this.oderResponse.status.id},
        services: this.oderResponse.services
      }

      this.oderService.editOrder(orderEdit).subscribe(()=>{
        this.statusEdit=false
        Swal.fire("Th??nh c??ng", "????n d?? ???????c s???a th??nh c??ng", "success");
        this.ngOnInit();
      })
    }

  }


  payment() {
    this.oderResponse.totalPrice=this.oderResponse.provider.priceByHour*this.oderResponse.hour;
  }

  complete() {
    this.oderService.acceptStatus(this.id, this.idStatus).subscribe(()=>{
      Swal.fire("Th??nh c??ng", "????n c???a b???n ???? ho??n th??nh", "success");
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
      Swal.fire("Th??nh c??ng", "????n c???a b???n ???? ho??n th??nh", "success");
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
      Swal.fire("Th??nh c??ng", "Giao d???ch th??nh c??ng", "success");
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
  getAvatar(){
    let data =this.oderResponse.user.image
      console.log(data);
      for (let i = 0; i < data.length ; i++) {
        if(data[i].categoryImage.id==1){
          this.avatarUrl = data[i].url
          console.log(this.avatarUrl)
        }
      }

  }

  getAvatarProvider(){
    let data =this.oderResponse.provider.image
      console.log(data);
      for (let i = 0; i < data.length ; i++) {
        if(data[i].categoryImage.id==1){
          this.avatarProvider = data[i].url
          console.log(this.avatarProvider)
        }
      }

  }
}
