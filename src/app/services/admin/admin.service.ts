import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(page:any){
    return this.httpClient.get(`${environment.baseUrl}/user/findAll?page=`+page);
  }

  getAllOrders(page:any){
    return this.httpClient.get(`${environment.baseUrl}/orders/findAll?page=`+page);
  }

  changeStatusFeedBack(feedbackId:any){
    return this.httpClient.put(`${environment.baseUrl}/feedback/changeStatus`,feedbackId);
  }
}
