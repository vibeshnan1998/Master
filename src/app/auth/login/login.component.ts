import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user: firebase.User;
  constructor(private service: LoginService) { }

  ngOnInit() {
    this.service.getloggedinuser().subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }
  LoginG() {
    console.log('logging in....');
    this.service.login();
  }
  LogoutG() {
    console.log('logging in....');
    this.service.logout();
  }

}
