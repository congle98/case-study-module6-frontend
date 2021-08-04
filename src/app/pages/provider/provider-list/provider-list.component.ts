import { Component, OnInit } from '@angular/core';
import {Provider} from "../../../interface/provider";
import {UserService} from "../../../services/user/user.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  totalElements: number = 0;
  providers1: Provider[] = [];
  providers2: Provider[] = [];




  constructor(private userService:UserService,) { }

  ngOnInit(): void {
    this.countProviders();
    this.getViewsListRequest({page: 0, size: 2});
    this.getPriceListRequest({page: 0, size: 2})
  }
  private getViewsListRequest(request:any) {
    this.userService.getAllProvidersByViews(request).subscribe(data =>{
      // @ts-ignore
      this.providers1 = data['content'];
      console.log(this.providers1);
    }, error => {
      console.log(error);
    })
  }
  nextViewsPage(event: PageEvent){
    console.log('event -->', event);
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();
    // @ts-ignore
    console.log('request[size]', request['size']);
    this.getViewsListRequest(request);
  }
  private countProviders() {
    this.userService.countProviders().subscribe(number =>{
      this.totalElements = (<number>number);
    })
  }
  private getPriceListRequest(request:any) {
    this.userService.getAllProvidersByPrice(request).subscribe(data =>{
      // @ts-ignore
      this.providers2 = data['content'];
      console.log(this.providers2);
    }, error => {
      console.log(error);
    })
  }
  nextPricePage(event: PageEvent){
    console.log('event -->', event);
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();
    // @ts-ignore
    console.log('request[size]', request['size']);
    this.getPriceListRequest(request);
  }

}
