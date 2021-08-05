import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CityService } from 'src/app/services/city/city.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrls: ['./user-update-profile.component.css'],
})
export class UserUpdateProfileComponent implements OnInit {

  // userInformationForm = new FormGroup({
  //   id: new FormControl(''),
  //   user: new FormControl(''),
  //   fullName: new FormControl(''),
  //   dateOfBirth: new FormControl(''),
  //   gender: new FormControl(''),
  //   city: new FormControl(''),
  //   image: new FormControl(''),
  //   height: new FormControl(''),
  //   weight: new FormControl(''),
  //   hobbies: new FormControl(''),
  //   description: new FormControl(''),
  //   facebookLink: new FormControl(''),
  //   priceByHour: new FormControl(''),
  //   services: new FormControl(''),
  //   money: new FormControl(''),
  //   isProvider: new FormControl(''),
  //   numberOfViews: new FormControl(''),
  //   numberOfRentals: new FormControl(''),
  // });
  userInformation={
    id:"",
    fullName:"",
    dateOfBirth:"",
    gender:"",
    city:{
      id:"",
      name:"",
    },
    height:"",
    weight:"",
    hobbies:"",
    description:"",
    facebookLink:"",
    priceByHour:"",
    isProvider:"",

  }
  cities: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private cityService: CityService,
    private router:Router
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.userId;
    console.log(id);
    this.getUserInformation(id);
    this.getAllCities();

  }

  getAllCities(){
    this.cityService.getAllCity().subscribe((cities)=>{
      this.cities = cities;
    })
  }

  getUserInformation(id: any) {
    this.userService.getUserInfoUpdate(id).subscribe(
      (userInformation:any) => {
        this.userInformation = userInformation;


      },
      (error) => {}
    );
  }


  updateInformation(){
    let userRp={
      id:this.userInformation.id,
      fullName:this.userInformation.fullName,
      dateOfBirth:this.userInformation.dateOfBirth,
      gender:this.userInformation.gender,
      city:{
        id:this.userInformation.city.id,
      },
      height:this.userInformation.height,
      weight:this.userInformation.weight,
      hobbies:this.userInformation.hobbies,
      description:this.userInformation.description,
      facebookLink:this.userInformation.facebookLink,
      isProvider:this.userInformation.isProvider,
      priceByHour:this.userInformation.priceByHour,
    }
    this.userService.updateInformation(userRp).subscribe((success:any)=>{
      // this.userInformation= success;
      Swal.fire("Thành công","Update thông tin thành công","success");

      this.router.navigate(["/user/"+this.userInformation.id]);
    })
  }
}
