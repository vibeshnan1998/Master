import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
user: firebase.User;
  constructor(private service: LoginService) { }

  ngOnInit() {
    this.service.getloggedinuser().subscribe( user => {
      console.log('updating picture...');
      this.user = user;
    });
  }
  logout() {
    this.service.logout();
  }

}
