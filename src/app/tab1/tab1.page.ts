import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  calendars = [];

  constructor(
    private router: Router,
    private calendar: Calendar,
    ) {
      this.calendar.listCalendars().then(data => {
        this.calendar = data;
      });
    }
    addEvent(cal: any) {
      const date = new Date();
      const options = {
        calendarId: cal.id,
        calendarName: cal.name,
      };
      this.calendar.createEventInteractivelyWithOptions('new Event', 'Munster', 'Activity', date, date, options).then(
        () => {

        }
      );
    }
    openCal(cal: any) {
      this.router.navigate(['calendarDetails', {name: cal.name}]);
    }

  salir() {
    this.router.navigate(['login']);
  }

}
