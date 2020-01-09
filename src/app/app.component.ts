import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'region';
  user: firebase.User;
  user1: firebase.User;
  isMenuOpen;
  contentMargin = 240;
  constructor(private afauth: AngularFireAuth,
              private service: LoginService) {
  }
  ngOnInit() {
    this.afauth.authState.subscribe(user => {
        console.log(user);
        this.user = user;
      });
    this.service.getloggedinuser().subscribe( user => {
        console.log('updating picture...');
        this.user1 = user;
      });
  }
  ontoolbarevent() {
    console.log('on toolbar toggle');
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  }
