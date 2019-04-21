import { AuthService } from './../services/auth.service';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {PacientesService} from '../services/pacientes.service';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.page.html',
  styleUrls: ['./add-edit-patient.page.scss'],
})

export class AddEditPatientPage implements OnInit {
  paciente: any = {};
  pacienteForm: FormGroup;
  update: boolean;
  id: string;
  email: '';
  constructor(
    private router: Router,
    public alertController: AlertController,
    private pacienteList: PacientesService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(data => {
      this.id = data.id;
      this.update = data.update || false;
      if ( this.id !== undefined) {
      this.pacienteList.getPaciente(this.id)
        .subscribe(datos =>{
          this.paciente = datos.payload.data();
          console.log(this.paciente);            
        })
        console.log('agregar',this.id);

      } else {
        this.paciente = {
          name: "",
          lastName: "",
          edad: "",
          phone: "",
          address: "",
          email: ""
        };
      }
    });
    this.pacienteForm = this.formBuilder.group({
      name: [this.paciente.name || '', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      lastName: new FormControl(this.paciente.lastName || '', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      edad: new FormControl(this.paciente.edad || '', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern('^[0-9]+$')
      ])),
      phone: new FormControl(this.paciente.phone || '', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$')
      ])),
      address: new FormControl(this.paciente.address || '', Validators.compose([
        Validators.required,
        Validators.maxLength(35),
      ])),
    });
    this.email = this.authService.getEmail();
  }
  save() {
    this.paciente = {
      name: this.pacienteForm.value.name,
      lastName: this.pacienteForm.value.lastName,
      edad: this.pacienteForm.value.edad,
      phone: this.pacienteForm.value.phone,
      address: this.pacienteForm.value.address,
      email: this.email
    };
      if (this.update) {
        console.log(this.paciente);
        console.log(this.id);
        this.pacienteList.updatePaciente(this.id, this.paciente);
        this.router.navigate(['/tabs/tab3']);
      } else {
        this.pacienteList.createPaciente(this.paciente);
        console.log(this.paciente);
        this.router.navigate(['/tabs/tab3']);
      }
    }
    atras() {
      this.router.navigate(['/tabs/tab3']);
    }

  }

