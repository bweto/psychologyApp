import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  user: any = {
    email: '',
    password: '',
    confPassword: ''
  };
  usuarios = [];
  existeUs = false;
  label = 'Regístrate';
  passwordValid = false;
  acepto = false;
  conectando = false;
  error_messages = {
    'email': [
    {type: 'required', message: 'Digita un Email.'},
    {type: 'minlength', message: 'El mail no puede tener menos de 6 caracteres.'},
    {type: 'maxlength', message: 'El email no puede tene mas de 45 caracteres.'},
    {type: 'pattern', message: 'Ingresa un mail valido.'},
    ],
    'password': [
      {type: 'required', message: 'Digita la contraseña'},
      {type: 'minlength', message: 'La contraseña debe tener mas de 6 caracteres'},
      {type: 'maxlength', message: 'La contraseña no puede tene mas de 10 caracteres.'}
      ],
      'confPassword': [
        {type: 'required', message: 'Digita la contraseña'},
        {type: 'minlength', message: 'La contraseña debe tener mas de 6 caracteres'},
        {type: 'maxlength', message: 'La contraseña no puede tene mas de 10 caracteres.'}
        ]

  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private usuarioService: UsuariosService,
    public toastController: ToastController,
    public network: Network,
    public dialogs: Dialogs
  ) {
    this.network.onDisconnect()
      .subscribe(() => {

      });

      this.network.onConnect()
        .subscribe(() => {
          setTimeout( () => {
            this.dialogs.alert('No tienes conexión ' + this.network.type);
          }, 2000);
        });
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(45),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')
      ]],
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ])),
      confPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]]
    });
  }
   login() {
     this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
     };
     this.conectando = true;
     if (this.label === 'Iniciar Sesión') {
      this.authService.handlerLogin(this.user)
       .then( () => {
        this.conectando = false;
        this.router.navigate(['../tabs/tab1']);
       })
       .catch(err => {
         if (err['code'] === "auth/wrong-password") {
          this.presentToast('Contraseña invalida', 'danger');
         } else if(err['code'] === "auth/network-request-failed" ){
          this.presentToast('No tienes conexión a internet', 'danger');
         } else {
          this.presentToast('Ingresa un correo valido', 'danger');
         }
         this.conectando = false;
       });
     } else {
      this.usuarioService.agregarUsuario(this.user.email);
      this.authService.handlerRegister(this.user)
     .then(() => {
      this.conectando = false;
      this.router.navigate(['../tabs/tab1']);
     }).catch( err => {
       console.log('hola');
      if (err['code'] === "auth/network-request-failed" ) {
        this.presentToast('No tienes conexión a internet', 'danger');
       }
     });
     }
  }

  async politica() {
    const politica = `<p>PsicologyApp almacena datos privados de sus pacientes los cuales sera utilizados 
                      por el usuario para gestionar y administrar citas de seguimiento de estos. Estos 
                      datos no serán utilizados por PsicologyApp, para ofrecer algún servicio o analizar 
                      dichos datos.<br><br>
                      La información sera almacenada en una base de datos de manera segura, al momento 
                      de borrar un paciente este sera eliminado de forma completa y dicha información 
                      sera irrecuperable.<br><br>
                      La información del usuario de PsicologyApp como su correo electrónico tendrá un 
                      uso solo al momento de realizar la autenticación en PsicologyApp.<br><br></p>
                      `;
    const alert = await this.alertCtrl.create({
      header: 'Política de Privacidad',
      message: politica,
      animated: true,
      backdropDismiss: false,
      keyboardClose: false,
      translucent: true,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.acepto = false;
            this.presentToast('Debes aceptar la política para usar la aplicación', 'danger');
          }
        }, {
          text: 'Acepto',
          handler: () => {
            this.acepto = true;
            this.presentToast('Gracias por aceptar, disfruta la aplicación', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  cargarUsuarios() {
    try {
    this.usuarioService.obtenerUsuarios()
      .subscribe(data => {
        data.forEach(usuario => {
          this.usuarios.push(usuario.payload.doc.data()['mail']);
        });
      });
    }
    catch(err){
      this.presentToast('No tienes conexión a Internet', 'danger');
    }
      
  }
  existe( event ) {
    if (this.usuarios.includes(event.detail.value)) {
      this.label = 'Iniciar Sesión';
      this.existeUs = true;
      this.acepto = true;
      return;
    } else {
      this.existeUs = false;
      this.acepto = false;
    }
  }
  esIgual(password, confPassword) {
    if ( password === confPassword) {
      return true;
    }
    return false;
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
