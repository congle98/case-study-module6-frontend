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
  totalPagesAll = 0;
  constructor(
    private providerHomeService: ProviderHomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUserPageAll();
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
}
