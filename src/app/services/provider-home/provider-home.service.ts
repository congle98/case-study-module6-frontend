import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderHomeService {

  constructor(private httpClient: HttpClient) {

  }

 getAllProviderHome(page?:number){
    return this.httpClient.get(`${environment.baseUrl}/home/findAll?page=`+page);
  }

  getAllProviderByViews(){
    return this.httpClient.get(`${environment.baseUrl}/home/allProviderForViews`);
  }
  getAllProviderHomeByViews(page?:number){
    return this.httpClient.get(`${environment.baseUrl}/home/findAllByViews?page=`+page);
  }
}
