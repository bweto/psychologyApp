import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.page.html',
  styleUrls: ['./calendar-details.page.scss'],
})
export class CalendarDetailsPage implements OnInit {
  calName: String;
  events: String;
  constructor(
    private calendar: Calendar,
    private activeRoute: ActivatedRoute,
    ) {}
  
  ngOnInit() {
    this.activeRoute.params.subscribe(data => {
      this.calName = data.name;
    });
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 31);
    this.calendar.listEventsInRange(start, end).then( data => {
      this.events = data;
    });
  }

}
