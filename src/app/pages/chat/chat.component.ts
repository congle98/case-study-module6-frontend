import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from 'src/app/services/user/user.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public Id: any;
  public selectedUser: any;
  public message = '';
  public messageHistory= new Array<any>();

  public user:any;
  public hiden=false;
 

  public webSocketEndPoint = 'http://localhost:8080/chat';
  public topic: any;
  public stompClient: Stomp.Client | undefined;
  constructor(private userService: UserService,private route: ActivatedRoute, private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {
    this.Id = +this.route.snapshot.params.userId;
    this.userService.getSelectUserChat(this.Id).subscribe((data)=>{
      this.onUserSelect(data);
      this.hiden=true;
      
    })
    this.userService.getSelectUserChat(this.loginService.getUser().id).subscribe((data)=>{
      this.user = data;
       this.topic = '/topic/' + this.loginService.getUser().id;
      this.connect();

    })
  
  
  
   
  }

  connect() {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(
      {},
      (frame:any) => {
        // After connection subscribe to the topic
        if(this.stompClient!=undefined){
           this.stompClient.subscribe( this.topic, (event:any) => {
             console.log("day la evedefdfdf fdfdnt cua tao",event);
          
          let mesagess = JSON.parse(event.body);
          if(this.loginService.getUser().id ==  mesagess.to)  {
            this.userService.getSelectUserChat(mesagess.from).subscribe((data)=>{
              this.onUserSelect(data);
              this.hiden=true;;
            })
            console.log("ahihi");
          }
          this.onMessageReceived(event.body);
        });
        }
       
      },
      this.onError
    );
  }

  // tslint:disable-next-line:typedef
  onError(error:any) {
    // Do something on error
  }

  // tslint:disable-next-line:typedef
  onMessageReceived(payload:any) {
    this.messageHistory.push(JSON.parse(payload));
  }

  // tslint:disable-next-line:typedef
  onUserSelect(user: any) {
    this.selectedUser = user;
  }

  // tslint:disable-next-line:typedef
  sendMessage() {
    // Construct the payload
    let payload = {
      message: this.message,
      from: this.user.userId,
      to: this.selectedUser.userId
    };
    // Send the message to the web socket
    if(this.stompClient!=undefined){
      this.stompClient.send('/app/message', {},  JSON.stringify(payload));
    }
    
    // push message to the current messages
    console.log(payload);
    this.messageHistory.push(payload);
    // clear message
    this.message = '';
  }

  offMessage(){
    this.hiden=false;
  }

  viewProfile(userId:any){
    
    this.router.navigate(["/user/"+userId]).then(() => {
      window.location.reload();
    });
  }

}
