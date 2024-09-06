import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';

import { TypedCalendarEvent, TypedMonthViewDay } from './interface';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
// import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss']
})
export class CalendarComponent {

  active = true;
  events: TypedCalendarEvent<any>[] = [];
  tableOpen = false;

  viewDate: Date = new Date();
  view = 'month';
  refresh: Subject<any> = new Subject();

  // @Input() events: TypedCalendarEvent[] = [];

  // @Input() active = false;

  @Output() dateChange = new EventEmitter<Date>();
  //@Output() dayClicked = new EventEmitter<TypedCalendarEvent[]>();

  //typeClicked(events: TypedCalendarEvent[]) {
  //this.dayClicked.emit(events);
  //}

  activeDayIsOpen: boolean = false;

  ngOnInit(): void {
    // var d = moment();
    // this.getItems(Number(d.format('M')), Number(d.format('YYYY')));
    //test data
    this.events = new Array();
    this.events.push({
      id: 'Nv5yW2Jk3ykx9kDxoXs0MA_R__R_', start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1), title: 'Sample Data', color: colors.yellow, type: 'enrolled', allDay: true, draggable: false,
    });
    this.events.push({
      id: 'Nv5yW2Jk3ykx9kDxoXs0MA_R__R_', start: subDays(startOfDay(new Date()), 2),
      end: addDays(new Date(), 2), title: 'Sample Data2', color: colors.yellow, type: 'enrolled', allDay: true, draggable: false,
    });
    this.events.push({
      id: 'Nv5yW2Jk3ykx9kDxoXs0MA_R__R_', start: subDays(startOfDay(new Date()), 3),
      end: addDays(new Date(), 3), title: 'Sample Data3', color: colors.yellow, type: 'enrolled', allDay: true, draggable: false,
    });

  }

  getItems(month: number, year: number) {
    let data = {
      active: true,
      month: month,
      // userId: this.loggedInUserId,
      year: year
    };
  }

  getTypesAndCounts(day: TypedMonthViewDay): { type: string, count: number, events: TypedCalendarEvent[] }[] {
    const typeCounts: { type: string, count: number, events: TypedCalendarEvent[] }[] = [];
    const typeIndex: { [type: string]: number } = {};

    for (const e of day.events) {
      if (!typeIndex.hasOwnProperty(e.type)) {
        typeCounts.push({ type: e.type, count: 0, events: [] });
        typeIndex[e.type] = typeCounts.length - 1;
      }

      const type: { type: string, count: number, events: TypedCalendarEvent[] } = typeCounts[typeIndex[e.type]];
      type.count++;
      type.events.push(e);
    }

    return typeCounts;
  }

  dateChanged() {
    this.getItems(this.viewDate.getMonth() + 1, Number(this.viewDate.getFullYear()));
  }

  typeClicked({ date, events }: { date: Date; events: TypedCalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  getCounts(day, type) {
    return day.events.filter(item => item.type == type).length;
  }

  handleEvent(action: string, event: TypedCalendarEvent): void {
    // some Route to Detail
  }

}
