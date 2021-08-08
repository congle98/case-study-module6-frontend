import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  searchByFullName(keywords:any){
    return this.httpClient.get(`${environment.baseUrl}/profile/searchByFullName/${keywords}`);
  }
}
