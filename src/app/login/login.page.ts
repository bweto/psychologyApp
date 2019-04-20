import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

}
