import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url="http://localhost:8080"
  constructor(private http: HttpClient) { }


  saveOrder(order: any): Observable<any>{
    console.log("da vao function");
    return this.http.post<any>(this.url+"/orders/create", order);

  }
  getOrderByProvider(id: any): Observable<any>{
    return this.http.get<any>(this.url+ "/orders/orderByProvider/"+id);
  }
  getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr !== null) {
      let user = JSON.parse(userStr)
      console.log(user.id)
      return user.id;

    } else {
      // this.logout();
      return null;
    }
  }
  getOrderByUser(id: any): Observable<any>{
    return this.http.get<any>(this.url+ "/orders/orderByUser/"+id);
  }


  getPriceOfUser(userId:any){
    return this.http.get(`${environment.baseUrl}/profile/getPrice/${userId}`);
  }

  acceptStatus(id:any, status: any){
    return this.http.put(this.url + "/orders/accept/" +id, status);
  }

  cancelOrder(id:any, status: any){
    return this.http.put(this.url + "/orders/decline/" +id, status);
  }

  getOrderById(id:any){
    return this.http.get(this.url + "/orders/findById/" +id);
  }

  paymentOrder(payment: any){
    return this.http.put(this.url + "/profile/paymentOder", payment);
  }

  editOrder(oder:any){
    return this.http.put(this.url + "/orders/edit/" +oder.id, oder);
  }


}
