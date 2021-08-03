import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ServicesProviderService } from 'src/app/services/services-provider/services-provider.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register-provider-dialog',
  templateUrl: './user-register-provider-dialog.component.html',
  styleUrls: ['./user-register-provider-dialog.component.css'],
})
export class UserRegisterProviderDialogComponent implements OnInit {
  userInformation:any = {
    userInformationId: this.userId,
    services:[],
    priceByHour: '',
  };
  pickService:any[]=[];
  services: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userId: any,
    private userService: UserService,
    private servicesProviderService: ServicesProviderService
  ) {}

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.servicesProviderService.getAllServices().subscribe((services) => {
      this.services = services;
    });
  }

  selectServices(event: any, serviceId: any) {
    console.log(event);
    if (event.target.checked) {
       this.pickService.push({id:serviceId});
       console.log(this.pickService);
    }
    else{
      this.pickService = this.pickService.filter(service => service.id !=serviceId);
    }
  }

  registerProvider(){
    this.userInformation.services = this.pickService;
    this.userService.registerProvider(this.userInformation).subscribe((success)=>{
      Swal.fire("Thành công","Yêu cầu đã được gửi đi, vui lòng chờ phê duyệt","info")
    })
  }
}
