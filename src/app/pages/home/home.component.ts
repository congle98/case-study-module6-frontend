import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderHomeService } from 'src/app/services/provider-home/provider-home.service';

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
  constructor(
    private providerHomeService: ProviderHomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUserPageAll();
    this.getAllUserByViewsPageAll()
  }

  // getAllProviderByVews() {
  //   this.providerHomeService.getAllProviderByViews().subscribe((providers) => {
  //     this.allProviderByViews = providers;
  //   });
  // }

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
