import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderHomeService {

  constructor(private httpClient: HttpClient) { 

  }

 getAllProviderHome(){
    return this.httpClient.get(`${environment.baseUrl}/home/findAll`);
  }

  getAllProviderByViews(){
    return this.httpClient.get(`${environment.baseUrl}/home/allProviderForViews`);
  }
}
