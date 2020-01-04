import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afauth: AngularFireAuth) { }
login() {
  console.log('Redirecting to google provider');
  this.afauth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
}
logout() {
  this.afauth.auth.signOut();
}
getloggedinuser() {
 return  this.afauth.authState;
}
}
