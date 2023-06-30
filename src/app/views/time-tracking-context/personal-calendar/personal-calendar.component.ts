import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import {CheckApiService} from "../../../core/services/check.api.service";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrls: ['./personal-calendar.component.scss']
})
export class PersonalCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin],
  };
  constructor(private checkApiService: CheckApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserEntity().subscribe(user => {
      if (!user) {
        return;
      }
      this.checkApiService.getAll(`user_id=${user.id}`).subscribe(res => {
        this.calendarOptions.events = res.data;
      });
    });
  }

}
