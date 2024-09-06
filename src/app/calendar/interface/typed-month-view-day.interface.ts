import { WeekDay } from 'calendar-utils';

import { TypedCalendarEvent } from './';

export interface TypedMonthViewDay extends WeekDay {
  inMonth: boolean;
  events: TypedCalendarEvent[];
  backgroundColor?: string;
  badgeTotal: number;
}
