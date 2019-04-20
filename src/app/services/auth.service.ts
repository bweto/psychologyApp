import { Injectable } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fbAuth: AngularFireAuthModule,
              private router: Router
    ) {
    firebase.initializeApp(environment.firebase);
  }

  handlerRegister(value: any) {
  return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(value.email,
      value.password)
      .then((res: any) => {
        console.log(res),
        this.router.navigate(['../tabs/tab1']);
      })
      .catch((error: any) => {
        console.error(error),
        this.handlerLogin(value);
      });
    });
  }
  
  handlerLogin(value: any) {
    return new Promise<any> ((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.router.navigate(['../tabs/tab1']);
      }, err => reject(err));
    });
  }
}

