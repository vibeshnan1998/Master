import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from './services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  otherTheme = false;
  title = 'region';
  user: firebase.User;
  user1: firebase.User;
  isMenuOpen;
  contentMargin = 240;
  showMenu = false;
  showMaster = false;
  showtheme = false;
  showbusiness =false
  constructor(private afauth: AngularFireAuth,
              private service: LoginService,
              public translate: TranslateService) {
               translate.addLangs(['en', 'fr']);
               translate.setDefaultLang('en');
               const browserLang = translate.getBrowserLang();
                /* translate.use(browserLang.match(/en|/fr) ? 'browserLang' : 'en'); */
  }
  ngOnInit() {
    this.afauth.authState.subscribe(user => {
        console.log(user);
        this.user = user;
        sessionStorage.setItem('key', 'vibe');
      });
    this.service.getloggedinuser().subscribe( user => {
        console.log('updating picture...');
        this.user1 = user;
      });
  }
  useLanguage(language: string) {
    this.translate.use(language);
}
changeTheme() {
  this.otherTheme = !this.otherTheme;
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
  toggleMenu() {
    this.showMenu = !this.showMenu;
 }
 toggleMaster() {
  this.showMaster = !this.showMaster;
}
toggletheme() {
  this.showtheme = !this.showtheme;
}
togglebusiness() {
  this.showbusiness = !this.showbusiness;
}

  }
