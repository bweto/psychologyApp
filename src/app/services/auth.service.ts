import { Injectable } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 email: '';
  constructor(public fbAuth: AngularFireAuthModule,
              private router: Router,
              public toastController: ToastController,
              private connectService: ConnectService,
    ) {
    firebase.initializeApp(environment.firebase);
  }

  handlerRegister(value: any) {
    this.email = value.email;
  return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(value.email,
      value.password)
      .then((res: any) => {
        console.log(res),
        this.router.navigate(['../tabs/tab1']);
      })
      .catch((error: any) => {
        this.handlerLogin(value);
      });
    });
  
  }
  
  handlerLogin(value: any) {
  
    this.email = value.email;
    return new Promise<any> ((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
      console.log(firebase.auth.Auth.Persistence.LOCAL);
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.router.navigate(['../tabs/tab1']);
      }, err => reject(err));
    }).catch(err => {
      if (err['code'] === "auth/network-request-failed" ) {
        this.presentToas('No tienes conexión a internet', 'danger');
       }
    }
    );
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  }

  getEmail() {

    return this.email;
  }

  salir() {
    
    firebase.auth().signOut()
    .then(() =>{
      this.presentToas('Adios', 'success');
    })
    .catch(err =>{
      this.presentToas('lo sentimos no fue posible cerrar la sesión', 'danger');
    });
  
  }

  async presentToas(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      animated: true,
      color: color,
      keyboardClose: true,
      position: 'top',
      mode: 'ios'
    });
    toast.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Lo sentimos no se detecta ninguna conexión',
      duration: 1500,
      animated: true,
      color: 'danger',
      keyboardClose: true,
      position: 'top',
      mode: 'ios',
    });
    toast.present();
  }
}

