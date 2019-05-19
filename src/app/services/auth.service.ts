import { Injectable } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 email: '';
  constructor(public fbAuth: AngularFireAuthModule,
              private router: Router,
              public toastController: ToastController
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
        console.error(error),
        this.handlerLogin(value);
      });
    });
  }
  
  handlerLogin(value: any) {
    this.email = value.email;
    return new Promise<any> ((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.router.navigate(['../tabs/tab1']);
      }, err => reject(err));
    });
  }

  getEmail() {
    return this.email;
  }

  salir() {
    firebase.auth().signOut()
    .then(() =>{
      this.presentToast('Adios', 'success');
    })
    .catch(err =>{
      this.presentToast('lo sentimos no fue posible cerrar la sesión', 'danger');
    });
  }

  async presentToast(mensaje: string, color: string) {
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
}

