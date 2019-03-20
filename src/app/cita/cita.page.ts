import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.page.html',
  styleUrls: ['./cita.page.scss'],
})
export class CitaPage implements OnInit {

  cita: any;
  citaForm: FormGroup;
  update: boolean;
  id: number;
  idPaciente: number;
  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private citaService: CitaService,
    private router: Router
  ) { }
  ngOnInit() {
    this.activeRoute.params.subscribe(data => {
      this.id = data.id;
      this.update = data.update || false;
      if ( this.id !== undefined) {
      this.cita = this.citaService.getCita(this.id, this.idPaciente);
      } else {
        this.cita = {
          fecha: "",
          titulo: "",
          resultado: "",
          idCita: "",
          idPaciente: ""
        };
      }
    });
    this.citaForm = this.formBuilder.group({
      fecha: [this.cita.fecha || '', [
        Validators.required,
        //Validators.maxLength(25),
        //Validators.pattern('^[a-zA-Z]+$')
      ]],
      titulo: new FormControl(this.cita.titulo || '', Validators.compose([
        Validators.required,
        //Validators.maxLength(25),
        //Validators.pattern('^[a-zA-Z]+$')
      ])),
      resultado: new FormControl(this.cita.resultado || '', Validators.compose([
        Validators.required,
        //Validators.minLength(1),
        //Validators.maxLength(3),
        //Validators.pattern('^[0-9]+$')
      ])),
      idCita: new FormControl(this.cita.idCita || '', Validators.compose([
        Validators.required,
      ])),
      idPaciente: new FormControl(this.cita.Idpaciente || '', Validators.compose([
        Validators.required,
      ]))

    });
  }
atras() {
  this.router.navigate(['/tabs/tab3']);
}

save() {
  this.cita = {
    fecha: this.citaForm.value.fecha,
    titulo: this.citaForm.value.titulo,
    resultado: this.citaForm.value.resultado,
    idCita: this.citaForm.value.idCita,
    idPaciente: this.citaForm.value.idCita
  };
    if (this.update) {
      this.citaService.updateCita(this.id, this.cita);
      this.router.navigate(['/tabs/tab3']);
    } else {
      this.citaService.createCita(this.cita);
      this.router.navigate(['/tabs/tab3']);
    }
}
}
