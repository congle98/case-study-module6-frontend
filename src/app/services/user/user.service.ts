import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  id: any;

  constructor(private httpClient:HttpClient) { }

  getUserInformation(userId:any){
    return this.httpClient.get(`${environment.baseUrl}/profile/view/${userId}`);
  }
  setView(userInformationId:any){
    return this.httpClient.put(`${environment.baseUrl}/profile/addviews`,userInformationId);
  }

  updateInformation(userInformation: any){
    return this.httpClient.put(`${environment.baseUrl}/profile`,userInformation);
  }

  getUserInfoUpdate(userId:any){
    return this.httpClient.get(`${environment.baseUrl}/profile/userInfoUpdate/${userId}`);
  }
  getUserAccount(userId:any){
    return this.httpClient.get(`${environment.baseUrl}/user/view/${userId}`);
  }
  getServiceProvider(userId:any){
    return this.httpClient.get(`${environment.baseUrl}/profile/service/${userId}`);
  }
  getId() {
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


}
