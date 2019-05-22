import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ConnectService } from './connect.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public firestore: AngularFirestore,
              private connectService: ConnectService,
              public toastController: ToastController ) { }

  obtenerUsuarios() {
    
    return this.firestore.collection('usuarios').snapshotChanges();
  
  }

  agregarUsuario(mail: string) {
    const data = {
                  mail: mail
                  };
                         
    return this.firestore.collection('usuarios').add(data);

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
