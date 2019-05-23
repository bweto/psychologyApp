import { AuthService } from './../services/auth.service';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder} from '@angular/forms';
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
        })
      } else {
        this.paciente = {
          name: '',
          lastName: '',
          edad: '',
          phone: '',
          address: '',
          email: ''
        };
      }
    });
    this.email = this.authService.getEmail();
  }
  save() {
    this.paciente = {
      name: this.paciente.name,
      lastName: this.paciente.lastName,
      edad: this.paciente.edad,
      phone: this.paciente.phone,
      address: this.paciente.address,
      email: this.email
    };
      if (this.update) {
        this.pacienteList.updatePaciente(this.id, this.paciente);
        this.router.navigate(['/tabs/tab3']);
      } else {
        this.pacienteList.createPaciente(this.paciente);
        this.router.navigate(['/tabs/tab3']);
      }
    }
    atras() {
      this.router.navigate(['/tabs/tab3']);
    }

  }

