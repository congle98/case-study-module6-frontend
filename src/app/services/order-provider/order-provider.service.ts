import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderProviderService {

  constructor(private httpClient: HttpClient) { }

  createNewOrder(createOrderRequest:any){
    return this.httpClient.post(`${environment.baseUrl}/orders/create`,createOrderRequest);
  }
}
