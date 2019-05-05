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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    // animation triggers go here
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  user: any;
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
      ]
  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
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
      ]))
    });
  }

   login() {
     this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
     };

    this.authService.handlerRegister(this.user)
     .then(() => {
      this.router.navigate(['../tabs/tab1']);
     })
     .catch(() => {
      this.authService.handlerLogin(this.user)
       .then( () => {
        this.router.navigate(['../tabs/tab1']);
       });
     });
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
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Acepto',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
