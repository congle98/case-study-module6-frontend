import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getUserInformation(userId:any){
    return this.httpClient.get(`${environment.baseUrl}/profile/${userId}`);
  }
  setView(userInformationId:any){
    return this.httpClient.put(`${environment.baseUrl}/profile/views`,userInformationId);
  }
}
