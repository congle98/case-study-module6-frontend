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
    return this.http.post<any>(this.url+"/createOrder", order);

  }
  getOrderByProvider(id: any): Observable<any>{
    return this.http.get<any>(this.url+ "/list/"+id);
  }
}
