import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'region';
  user: firebase.User;
  constructor(private afauth: AngularFireAuth) {
  }
  ngOnInit() {
    this.afauth.authState.subscribe(user => {
        console.log(user);
        this.user = user;
      });
  }

}
