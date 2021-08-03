import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesProviderService {

  constructor(private httpClient: HttpClient) { }

  getAllServices(){
    return this.httpClient.get(`${environment.baseUrl}/services`);
  }
}
