import { Component, OnInit } from '@angular/core';
import { ProviderHomeService } from 'src/app/services/provider-home/provider-home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProvider:any;
  allProviderByViews:any;
  constructor(private providerHomeService: ProviderHomeService) { }

  ngOnInit(): void {
    this.getAllProvider();
    // this.getAllProviderByVews();
  }

  getAllProvider(){
    this.providerHomeService.getAllProviderHome().subscribe((providers:any)=>{
      this.allProvider = providers.content;
      console.log(this.allProvider);
    })
  }

  getAllProviderByVews(){
    this.providerHomeService.getAllProviderByViews().subscribe((providers)=>{
      this.allProviderByViews = providers;
      console.log(this.allProviderByViews);
    })
  }

}
