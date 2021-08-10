import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserRegisterProviderDialogComponent } from '../user-register-provider-dialog/user-register-provider-dialog.component';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OderCreateComponent } from '../../order/oder-create/oder-create.component';
import { OrderService } from 'src/app/services/order/order.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user: any;
  userInformation: any;
  userInformationAvatar: any;
  checkUser = false;
  avatarFile: any;
  imageFile: any;
  imageUrl: any;
  providerId: any;

  feedBacksOfProvider:any;
  pageFeedBack=0;
  totalPagesFeedBack=0;

  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private storage: AngularFireStorage,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    
    private feedBackService:FeedbackService
  ) {}

  ngOnInit(): void {
    
    this.getUser();
    let id = this.activatedRoute.snapshot.params.userId;
    console.log('id trên đường link' + id);
    this.getUserInformation(id);
    this.getAllFeedBackByProvider(id,this.pageFeedBack);  
   
  }

  openDialogRegisterProvider() {
    this.dialog.open(UserRegisterProviderDialogComponent, {
      data: this.userInformation.id,
    });
  }

  openOrderDialog() {
    if (this.loginService.getUser()) {
      this.dialog.open(OrderDialogComponent, {
        data: this.userInformation,
      });
    } else {
      this.router.navigate(['/login']);
      this.snackBar.open('vui đăng nhập trước khi sử dụng vụ', 'x', {
        duration: 2000,
      });
    }
  }


  getUser() {
    if (this.loginService.getUser() != null) {
      this.user = this.loginService.getUser();
    }
  }
  getUserInformation(id: any) {
    this.userService.getUserInformation(id).subscribe(
      (userInformation: any) => {
        this.userInformation = userInformation;
        this.checkUserInit();
        this.getUserInformationAvatar(userInformation);
        // }
      },
      (error) => {
        this.router.navigate(['/error']);
      }
    );
  }
  checkUserInit() {
    if (this.user != null) {
      if (this.user.id == this.userInformation.user.id) {
        this.checkUser = true;
      } else {
        this.addViews(this.userInformation.id);
      }
    }
  }

  addViews(id: any) {
    this.userService.setView(id).subscribe();
  }

  getUserInformationAvatar(userInformation: any) {
    if (userInformation != null) {
      for (let i = 0; userInformation.image.length; i++) {
        if (userInformation.image[i].categoryImage.name == 'Avatar') {
          this.userInformationAvatar = userInformation.image[i].url;
        }
      }
    }
  }

  providerStatusOff(userInformationId: any) {
    Swal.fire({
      title:
        'Bạn chắc chắn chứ, mọi thông tin về tài khoản của bạn trên trang chủ sẽ bị ẩn đi',
      showCancelButton: true,
      confirmButtonText: `Đồng ý`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .providerStatusOff(userInformationId)
          .subscribe((success) => {
            this.userInformation = success;
            Swal.fire('Thành công', 'Bạn đã dừng cung cấp dịch vụ', 'success');
          });
      }
    });
  }

  ///thay đổi avatar
  setAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) =>
        (this.userInformationAvatar = e.target.result);
      this.avatarFile = event.target.files[0];
    } else {
      this.userInformationAvatar = null;
    }
  }

  updateAvatarToFireBase() {
    if (this.avatarFile != null) {
      const filePath = `${this.avatarFile.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.avatarFile)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.userInformationAvatar = url;

              this.updateAvatarToDatabase();
            });
          })
        )
        .subscribe();
    }
  }

  updateAvatarToDatabase() {
    let updateAvatarRequest = {
      userInformationId: '',
      url: '',
    };
    updateAvatarRequest.userInformationId = this.userInformation.id;
    updateAvatarRequest.url = this.userInformationAvatar;

    this.userService.updateAvatar(updateAvatarRequest).subscribe(
      (userInformation: any) => {
        let user = this.loginService.getUser();

        user.avatar.url = this.userInformationAvatar;

        this.userInformation = userInformation;
        this.loginService.setUser(user);
        this.avatarFile = undefined;
        Swal.fire('Thành công', 'Update thành công!', 'success');
        this.loginService.loginStatusSubject.next(true);
      },
      (error) => {}
    );
  }

  cancelAvatar() {
    this.avatarFile = undefined;
    this.getUserInformationAvatar(this.userInformation);
  }

  // xoá ảnh

  deleteImage(imgId: any) {
    this.userService.deleteImage(imgId).subscribe((succes) => {
      this.userInformation.image = this.userInformation.image.filter(
        (img: any) => img.id != imgId
      );
    });
  }

  // thêm ảnh mới

  setImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
    }
  }

  updateImgToFireBase() {
    if (this.imageFile != null) {
      const filePath = `${this.imageFile.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.imageFile)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imageUrl = url;
              this.updateImgToDatabase();
            });
          })
        )
        .subscribe();
    }
  }

  updateImgToDatabase() {
    let addImageRequest = {
      userInformationId: '',
      url: '',
    };
    addImageRequest.url = this.imageUrl;
    addImageRequest.userInformationId = this.userInformation.id;
    this.userService.addImage(addImageRequest).subscribe(
      (userInformation: any) => {
        this.userInformation = userInformation;
        this.imageFile = undefined;
      },
      (error) => {}
    );
  }
  cancelImg() {
    this.imageFile = undefined;
  }

  createOrder() {
    if (this.user == null) {
      this.router.navigate(['/login']);
      Swal.fire(
        'Chưa đăng nhập',
        'Vui lòng đăng nhập trước khi thuê',
        'warning'
      );
    } else {
      this.activatedRoute.paramMap.subscribe((p: ParamMap) => {
        this.providerId = p.get('userId');
        console.log(p);
        console.log(this.providerId);
      });
      this.dialog.open(OderCreateComponent, {
        data: this.providerId,
      });
    }
  }

  getAllFeedBackByProvider(id:any,page:any){
    this.feedBackService.findAllFeedBackByProvider(id,page).subscribe((data:any)=>{
      this.feedBacksOfProvider = data.content;
      this.totalPagesFeedBack = data.totalPages;
      console.log( data);
  
    })
  }
  nextPageAll() {
    this.pageFeedBack += 1;
    this.getAllFeedBackByProvider(this.userInformation.id,this.pageFeedBack);

}

backPageAll() {
    this.pageFeedBack -= 1;
    this.getAllFeedBackByProvider(this.userInformation.id,this.pageFeedBack);
 
}
chat() {
  
    this.router.navigate([`user/${this.user.id}/chat/${this.userInformation.id}`]);
  
}
}
