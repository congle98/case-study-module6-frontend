import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users:any;
  page=0;
  totalPages=0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.adminService.getAllUsers(this.page).subscribe((data:any)=>{
      this.totalPages = data.totalPages;
      this.users =data.content;
    })
  }

  backPage(){
    this.page-=1;
    this.getAllUsers();
  }
  nextPage(){
    this.page+=1;
    this.getAllUsers();
  }

}
