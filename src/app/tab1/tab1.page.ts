import { Component, 
          OnInit, 
          ViewChild, 
          Inject, 
          LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate} from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime:'',
    allDay: false
  }
  eventSource = [];
  calendar = {
    mode: 'day',
    currentDate: new Date()
  }
  viewTitle='';
  minDate = new Date().toISOString();
  @ViewChild(CalendarComponent) cal: CalendarComponent;
  constructor(private router: Router,
              private alertCtrl: AlertController,
              @Inject(LOCALE_ID) private locale: string
    ) {}
    
    ngOnInit() {
      this.resetEvent();
    }
    resetEvent() {
      this.event = {
        title: '',
        desc: '',
        startTime: new Date().toISOString(),
        endTime:new Date().toISOString(),
        allDay: false
      }
    }
    addCita(){
      const newCita ={
        title: this.event.title,
        desc: this.event.desc,
        startTime: new Date(this.event.startTime),
        endTime:new Date(this.event.endTime),
        allDay: this.event.allDay
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
        message: 'From: ' + start + '<br><br>To: ' + end,
        buttons: ['Ok']
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

    
   
}
