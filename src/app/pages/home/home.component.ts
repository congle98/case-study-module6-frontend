import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city/city.service';
import { ProviderHomeService } from 'src/app/services/provider-home/provider-home.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allProvider: any;
  allProviderByViews: any;
  pageAll = 0;
  pageAll2 = 0;
  totalPagesAll = 0;

  searchFilter={
    gender:"",
    city:"",
    price:""
  }
  searchList:any;

  cities: any;
  constructor(
    private providerHomeService: ProviderHomeService,
    private router: Router,
    private cityService:CityService,
    private searchService:SearchService
  ) {}

  ngOnInit(): void {
    this.getAllUserPageAll();
    this.getAllUserByViewsPageAll();
    this.getAllCities();
  }

  // getAllProviderByVews() {
  //   this.providerHomeService.getAllProviderByViews().subscribe((providers) => {
  //     this.allProviderByViews = providers;
  //   });
  // }

  getAllCities(){
    this.cityService.getAllCity().subscribe((cities)=>{
      this.cities = cities;
    })
  }

  setGenderSearch(gender:any){
    this.searchFilter.gender = gender;
  }
  setAddressSearch(city:any){
    this.searchFilter.city = city;
  }
  setPriceSearch(price:any){
    this.searchFilter.price = price;
  }
  searchFilterRequest(){
    this.searchService.searchFilter(this.searchFilter).subscribe((data)=>{
      console.log(data);
      this.searchList=data;
     this.searchFilter.city="";
     this.searchFilter.price="";
     this.searchFilter.gender="";
    });
  }

  userInformationPage(userInforId: any) {
    console.log(userInforId);
    this.router.navigate(['/user/'+userInforId]);
  }

  getAllUserPageAll() {
    //có paging thì phải .content
    this.providerHomeService
      .getAllProviderHome(this.pageAll)
      .subscribe((data: any) => {
        this.totalPagesAll = data.totalPages;
        this.allProvider = data.content;
      });
  }

  nextPageAll(event: any) {
      this.pageAll += 1;
      this.getAllUserPageAll();
    event.preventDefault();
  }

  backPageAll(event: any) {
      this.pageAll -= 1;
      this.getAllUserPageAll();
    event.preventDefault();
  }
  getAllUserByViewsPageAll() {
    //có paging thì phải .content
    this.providerHomeService
      .getAllProviderHomeByViews(this.pageAll2)
      .subscribe((data: any) => {
        this.allProviderByViews = data['content'];
        console.log(this.allProviderByViews);
        console.log(data);
      });
  }
  nextPageAll2(event: any) {
    this.pageAll2 += 1;
    this.getAllUserByViewsPageAll();
    event.preventDefault();
  }

  backPageAll2(event: any) {
    this.pageAll2 -= 1;
    this.getAllUserByViewsPageAll();
    event.preventDefault();
  }
}
