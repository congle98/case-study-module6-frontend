import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { SearchService } from 'src/app/services/search/search.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any;
  isUser=false;
  isAdmin=false;
  searchValue="";
  searchResult:any;
  
 

  

  constructor(public loginService: LoginService, private router: Router,private searchService:SearchService,private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    if(this.isLoggedIn){
      this.getRole();
    }
    this.loginService.loginStatusSubject.asObservable().subscribe((data:any)=>{
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser();
      if(this.isLoggedIn){
        this.getRole();
      }
      
    })
  }

  logout(){
    this.loginService.logout();
    this.isUser=false;
    this.isAdmin=false;
    this.router.navigate(["/login"]);
   

  }

  getRole(){
    let role = this.loginService.getUserRole();
    for(let i =0;i<role.length;i++){
      if(role[i].name =="USER"){
        this.isUser = true;
      }
      if(role[i].name =="ADMIN"){
        this.isAdmin = true;
      }
    }
  }
  userDashboard(){
    this.router.navigate(["/user/"+this.user.id]).then(() => {
      window.location.reload();
    });
  }

  searchByFullName(){
    setTimeout(()=>{
      this.getResult();
    },1500);
  }


  getResult(){
    if(this.searchValue.trim()==''){
      this.searchResult=null;
    }
   this.searchService.searchByFullName(this.searchValue).subscribe((data)=>{
      this.searchResult = data;
      console.log(this.searchResult);
    })
  }

  viewProfile(id:any){
    this.userService.userStatusSubject.next(true);
    this.router.navigate(["/user/"+id]) .then(() => {
      window.location.reload();
    });
    this.searchValue="";
  
  
  }

  
 

}
