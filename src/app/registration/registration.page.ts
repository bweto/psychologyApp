import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {PacientesFormulario} from '../services/paciente.formulario'

 @Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  from: FormGroup;

  constructor(
    private fb: FormBuilder,
    private services:PacientesFormulario,
    public navCtrl: NavController,
    private alertContrl: AlertController) { 
      this.crearFormulario();
    }

  crearFormulario() {
    this.from = this.fb.group({
      NombreEstudiante:['',Validators.required],
      Edad:['',Validators.required],
      Sexo:['',Validators.required],
      Curso:['',Validators.required],
      NombreMamá:['',Validators.required],
      NúmeroTelefónico:['',Validators.required],
      DirecciónResidencia:['',Validators.required],
      NombrePapá:['',Validators.required],
      NúmeroTelefónicoP:['',Validators.required],
      DirecciónResidenciaP:['',Validators.required],
      NombreAcudiente:['',Validators.required],
      CasoNúmero:['',Validators.required],
      MotivoCita:['',Validators.required],
      Caso:['',Validators.required],
      Remitir:['',Validators.required],
      Anexos:['',Validators.required],

      
    })
  }
  guardarPaciente(){
    this.services.getPaciente(this.from.value)
    .subscribe(
      rs => this.showAlert(),
      er => console.log(er),
      () => console.log('ok')
    )
  }
  showAlert(){
    let alert = this.alertContrl.create({
      //title:'Agregar paciente',
      //subTitle: 'Los datos fueron guardados',
      buttons: ['OK']
    });
    alert.finally();
    this.from.reset();
  }
}
