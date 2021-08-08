import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {LoginService} from "../../../services/login/login.service";

@Component({
  selector: 'app-order-provider',
  templateUrl: './order-provider.component.html',
  styleUrls: ['./order-provider.component.css']
})
export class OrderProviderComponent implements OnInit {

  orderList: any;
  id: any;


  constructor(private oderService: OrderService,
              private route: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.id = this.oderService.getUser()
    this.oderService.getOrderByProvider(this.id).subscribe((data) => {
      console.log(data);
      this.orderList = data;
    });
  }

  accept(item: any) {
    console.log("đây là :", item);
    this.oderService.acceptStatus(item.id, item.status.id).subscribe((data) => {
      console.log("chuyen trang thai");
      Swal.fire("Thành công", "Giao dịch thành công", "success");
      this.ngOnInit();

    })

  };

  decline(id: any, status: any) {
    this.oderService.cancelOrder(id, status).subscribe((data) => {
      // this.route.navigateByUrl("/order");

      Swal.fire("Hủy thành công", "Bạn đã từ chối nhận đơn", "success");
      this.ngOnInit();
    })

  }

  payment(item: any) {
      if (item.status.id == 3) {
        const paymentRequest = {
          userId: item.user.id,
          providerId: item.provider.id,
          money: item.totalPrice
        }
        console.log(paymentRequest);
        this.oderService.paymentOrder(paymentRequest).subscribe(data => {
          console.log("da cong tien");
          this.accept(item);
          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user);
            this.loginService.loginStatusSubject.next(true);


          });
        });
      }

  }



}
