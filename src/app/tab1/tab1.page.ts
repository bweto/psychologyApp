import { Component, 
          OnInit, 
          ViewChild, 
          Inject, 
          LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
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
    endTime:'',
    allDay: false,
    email: ''
  }
  eventSource = [];
  calendar = {
    mode: 'day',
    currentDate: new Date()
  }
  nombresPacientes:any[]=[];
  email: string= '';
  nombre: string='';
  viewTitle='';
  minDate = new Date().toISOString();
  @ViewChild(CalendarComponent) cal: CalendarComponent;
  constructor(private router: Router,
              private alertCtrl: AlertController,
              @Inject(LOCALE_ID) private locale: string,
              private authService: AuthService,
              private pacientesService: PacientesService,
              private citaService: CitaService,
    ) {}
    
    ngOnInit() {
      this.email = this.authService.getEmail();
      this.resetEvent();
      this.obtenerPacientes();
      this.obtenerCitas();
    }
    resetEvent() {
      this.event = {
        title: '',
        desc: '',
        paciente: '',
        startTime: new Date().toISOString(),
        endTime:new Date().toISOString(),
        allDay: false,
        email: ''
      }
    }
    addCita(){
      const newCita ={
        title: this.event.title,
        desc: this.event.desc,
        paciente: this.event.paciente,
        startTime: new Date(this.event.startTime),
        endTime:new Date(this.event.endTime),
        allDay: this.event.allDay,
        email: this.email
      }
      console.log(newCita);
      
      if(newCita.allDay){
        const start = newCita.startTime;
        const end = newCita.endTime;
        newCita.startTime = new Date(Date.UTC(start.getUTCFullYear(),
                                              start.getUTCMonth(),
                                              start.getUTCDate())
                                      );
        newCita.endTime = new Date(Date.UTC(end.getUTCFullYear(),
                                              end.getUTCMonth(),
                                              end.getUTCDate() + 1)
                                    );           
      }
        this.eventSource.push(newCita);
        this.crearCita(newCita)
        this.cal.loadEvents();
        this.resetEvent();      
    }
    
    changeMode(mode: string){
      this.calendar.mode = mode;
    }
    today(){
      this.calendar.currentDate = new Date();
    }
    onCurrentDateChanged(evn){

    }
    async onEventSelected(env){
      const start = formatDate(this.event.startTime, 'medium', this.locale);
      const end = formatDate(this.event.endTime, 'medium', this.locale);
      const alert = await this.alertCtrl.create({
        header: this.event.title,
        subHeader: this.event.desc,
        message: 'Inicio: ' + start + '<br><br>Fin: ' + end,
        buttons: ['Salir']
      });
      alert.present();
    }

    onViewTitleChanged(title){
      this.viewTitle = title;
    }
    onTimeSelected(env){
      const selected = new Date(env.selectedTime);
      this.event.startTime = selected.toISOString();
      selected.setHours(selected.getHours() + 1);
      this.event.endTime = (selected.toISOString());
    }

    obtenerPacientes(){
      this.pacientesService.getAllPacientes()
        .subscribe(paciente => {
          paciente.forEach(data =>{
            const paciente = data.payload.doc.data();
            console.log(paciente['name']);
            const name = `${paciente['name']} ${paciente['lastName']}`;
            const id = data.payload.doc.id
              if(paciente['email'] === this.email){
                this.nombresPacientes.push(name);
              }
          })
        });
    }

    crearCita(cita: any){
      this.citaService.createCita(cita);
    }
    obtenerCitas(){
      this.citaService.getAllCitas()
        .subscribe(cita => {
          cita.forEach(data =>{
            const cita = data.payload.doc.data();
            const id = data.payload.doc.id
              if (cita['email'] === this.email) {
                const start = cita['startTime'].toDate();
                const fin = cita['endTime'].toDate();
                cita['startTime'] = start;
                cita['endTime'] = fin;
                this.eventSource.push(cita);
              }
          });
        });
    }
}
