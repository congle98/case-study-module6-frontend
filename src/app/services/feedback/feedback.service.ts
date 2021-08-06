import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient: HttpClient) { }


  createFeedBack(feedbackCreateRequest:any){
    return this.httpClient.post(`${environment.baseUrl}/feedback/create`,feedbackCreateRequest);
  }
}
