import { Component,
          OnInit,
          ViewChild,
          Inject,
          LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController, ToastController } from '@ionic/angular';
import { formatDate} from '@angular/common';
import { AuthService } from './../services/auth.service';
import { PacientesService } from '../services/pacientes.service';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  event = {
    title: '',
    desc: '',
    paciente: '',
    startTime: '',
    endTime: '',
    allDay: false,
    email: ''
  };
  eventSource: any[];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  nombresPacientes: any[];
  email = '';
  nombre = '';
  viewTitle = '';
  //minDate = new Date().toISOString();
  @ViewChild(CalendarComponent) cal: CalendarComponent;
  constructor(private router: Router,
              private alertCtrl: AlertController,
              @Inject(LOCALE_ID) private locale: string,
              private authService: AuthService,
              private pacientesService: PacientesService,
              private citaService: CitaService,
              private toastController: ToastController
    ) { }

    ngOnInit() {
      this.email = this.authService.getEmail();
      this.obtenerCitas();
      this.obtenerPacientes();
      this.resetEvent();
      this.cal.loadEvents();

    }
    resetEvent() {
      this.event = {
        title: '',
        desc: '',
        paciente: '',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        allDay: false,
        email: ''
      };
    }
    addCita() {
      const newCita = {
        title: this.event.title,
        desc: this.event.desc,
        paciente: this.event.paciente,
        startTime: new Date(this.event.startTime),
        endTime: new Date(this.event.endTime),
        allDay: this.event.allDay,
        email: this.email
      };
        this.eventSource.push(newCita);
        this.crearCita(newCita);
        this.cal.loadEvents();
        this.resetEvent();
        this.presentToast('Creaste una cita de forma exitosa', 'success');
    }

    changeMode(mode: string) {
      this.calendar.mode = mode;
    }
    today() {
      this.calendar.currentDate = new Date();
    }
    onCurrentDateChanged(evn) {

    }
    async onEventSelected(env) {
      const start = formatDate(env.startTime, 'medium', this.locale);
      const end = formatDate(env.endTime, 'medium', this.locale);
      const alert = await this.alertCtrl.create({
        header: env.title,
        subHeader: env.desc,
        message: env.paciente + '<br><br>Inicio: ' + start + '<br><br>Fin: ' + end,
        buttons: ['Salir']
      });
      alert.present();
    }

    onViewTitleChanged(title) {
      this.viewTitle = title;
    }
    onTimeSelected(env) {
      const selected = new Date(env.selectedTime);
      this.event.startTime = selected.toISOString();
      selected.setHours(selected.getHours()).toLocaleString();
      this.event.endTime = (selected.toISOString());
    }

    obtenerPacientes() {
      this.nombresPacientes = [];
      this.pacientesService.getAllPacientes()
        .subscribe(paciente => {
          this.nombresPacientes = [];
          paciente.forEach(data => {
            const paciente = data.payload.doc.data();
            const name = `${paciente['name']} ${paciente['lastName']}`;
            const id = data.payload.doc.id;
            if (this.nombresPacientes === undefined) {
              this.nombresPacientes = [];
            }
              if(paciente['email'] === this.email) {
                this.nombresPacientes.push(name);
              }
              this.nombresPacientes = this.nombresPacientes.filter((item, index, array) => {
                return array.indexOf(item) === index;
              });
          });
        });
    }

    crearCita(cita: any) {
      this.citaService.createCita(cita);
    }

    obtenerCitas() {
      this.citaService.getAllCitas()
        .subscribe(cita => {
          cita.forEach(data => {
            const cita = data.payload.doc.data();
            const id = data.payload.doc.id;
              if (cita['email'] === this.email) {
                const start = cita['startTime'].toDate();
                const fin = cita['endTime'].toDate();
                cita['startTime'] = start;
                cita['endTime'] = fin;
                if (this.eventSource === undefined) {
                  this.eventSource = [];
                }
                this.eventSource.push(cita);
              }
          });
        });
    }

    salir() {
      this.authService.salir();
      this.router.navigate(['/login']);
    }

    async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      animated: true,
      color: color,
      keyboardClose: true,
      position: 'top',
      mode: 'ios',
    });
    toast.present();
  }

}
