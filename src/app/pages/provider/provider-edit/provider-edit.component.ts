import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";



@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css']
})
export class ProviderEditComponent implements OnInit {
    userAccount:any ={
        // username: "username1",
        // email: "email1",
        // phone: "phone1",
        // role: "USER",
        // status: true,
        // isprovider: true
    }
    userInformation:any={
      name: "name1",
      year: "year1",
      gender: "nam",
      city: "hanoi",
      country: "VN",
      height: "165cm",
      weight: "55kg",
      favorite: "thích chơi, thích học, thích nhạc",
      description: "Một chàng trai ga lăng, học bình thường , bốc phét",
      requestion: "Hãy là cô gái ưa nhìn, tâm hồn đẹp",
      facebook: "linkfacebook.com",
      date: "01082021"


    }
    service1:any=[
      { name: "ra mắt người nhà"},
      { name: "Ra mắ bạn"},
      { name: "Du lịch chung cùng nhóm bạn"},
      { name: "Đi chơi chung"}
    ]

  service2:any=[
    { name: " Nắm tay"},
    { name: "Nói yêu"},
    { name: "Nhìn mắt"}

  ]
  service3:any=[
    { name: " Nắm tay"},
    { name: "Hôn tay"},
    { name: " Nhõng nhẽo"},
    { name: " Cử chỉ thân mật"}

  ]
  userImage: any=[
    "https://1.bp.blogspot.com/-5n_rEz8D0b8/Xk556_wb4KI/AAAAAAAAVVM/Z-v6YSPT3swBVpUWfd7NOForHs-OYRHGACLcBGAsYHQ/s1600/Anh-Trai-Dep-20023456-Wap102%2B%25281%2529.jpg",
    "https://1.bp.blogspot.com/-5n_rEz8D0b8/Xk556_wb4KI/AAAAAAAAVVM/Z-v6YSPT3swBVpUWfd7NOForHs-OYRHGACLcBGAsYHQ/s1600/Anh-Trai-Dep-20023456-Wap102%2B%25281%2529.jpg",
    "https://1.bp.blogspot.com/-5n_rEz8D0b8/Xk556_wb4KI/AAAAAAAAVVM/Z-v6YSPT3swBVpUWfd7NOForHs-OYRHGACLcBGAsYHQ/s1600/Anh-Trai-Dep-20023456-Wap102%2B%25281%2529.jpg",
    "https://1.bp.blogspot.com/-5n_rEz8D0b8/Xk556_wb4KI/AAAAAAAAVVM/Z-v6YSPT3swBVpUWfd7NOForHs-OYRHGACLcBGAsYHQ/s1600/Anh-Trai-Dep-20023456-Wap102%2B%25281%2529.jpg"
  ]

id: any;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.userService.getId()
    this.setUserAccount();
    this.setUserInformation();
    this.setService();

  }

  setUserAccount(){
    this.userService.getUserAccount(this.id).subscribe((data)=>{
      console.log(data);
      this.userAccount= data;
    })
  }

  setUserInformation(){
    this.userService.getUserInformation(this.id).subscribe((data)=>{
      console.log(data);
      this.userInformation= data;
    })
  }

  setService(){
    this.userService.getServiceProvider(this.id).subscribe((data)=>{
      console.log(data);
    })
  }


}
