import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApilayerService } from '../apilayer.service';
import { MenuDish } from '../Models/MenuDish';
import { Meals } from '../Models/Meals';
import { MenuDetail } from '../Models/MenuDetail';
import { Router } from '@angular/router';
import { endOfYear } from 'date-fns';
import { DatePipe } from '@angular/common';
import { Menu } from '../Models/Menu';
import { ClientMenu } from '../Models/ClientMenu';

export class DayDate {
  day: string;
  dates: Date[];
  dishIds: number[];
  mealId: Number;
  mealName: string;
  isSaved: boolean;

  constructor() {
    this.day = "";
    this.dates = new Array();
    this.dishIds = new Array();
    this.isSaved = false;
  }
}

@Component({
  selector: 'app-mobi-calendar',
  templateUrl: './mobi-calendar.component.html',
  styleUrls: ['./mobi-calendar.component.css'],
  providers: [DatePipe]
})
export class MobiCalendarComponent implements OnInit {

  monthDate: Date = new Date();
  weekDate: Date = new Date();
  dateRange: Date[] = new Array();
  range = { Today: [new Date(), new Date()], 'This Year': [new Date(), endOfYear(new Date())] };

  radioValue: string = "weekly";
  dayDates: DayDate[] = new Array();
  dishes: MenuDish[];
  meals: Meals[];
  saveItems: MenuDetail[];

  isAddTemplate: boolean = false;
  isConfirmLoading: boolean = false;

  startTime: { hour: number, minute: number } = { hour: 0, minute: 0 };
  endTime: { hour: number, minute: number } = { hour: 0, minute: 0 };

  mealId: number;
  mealName: string;
  mealDescription: string;

  constructor(private service: ApilayerService,
    private router: Router,private datePipe: DatePipe) { }

  ngOnInit() {

    // Mock Data
    // this.meals = [
    //   { MealID: 1, Description: "Lunch", TimeFrom: "", TimeTo: "", isActive: true },
    //   { MealID: 2, Description: "Dinner", TimeFrom: "", TimeTo: "", isActive: true }
    // ];

    // this.dishes = [
    //   { MenuDishID: 1, DishName: "Beef Pulao", DishDescription: "", DishTypeID: 1, DishType: "Desi", Sequence: 1, isActive: true },
    //   { MenuDishID: 2, DishName: "Chiken Tikka", DishDescription: "", DishTypeID: 2, DishType: "BBQ", Sequence: 2, isActive: true },
    //   { MenuDishID: 3, DishName: "Zinger Burger", DishDescription: "", DishTypeID: 3, DishType: "Fast Food", Sequence: 3, isActive: true },
    //   { MenuDishID: 4, DishName: "Chicken Biryani", DishDescription: "", DishTypeID: 1, DishType: "Desi", Sequence: 4, isActive: true },
    // ];

    this.setInitials();

    this.getDishes();
    this.getMeals();

    this.saveItems = new Array();
  }

  setInitials() {

  }

  getDishes() {
    this.service.getAllDishes().subscribe(
      (res) => {
        console.log(res);
        this.dishes = new Array();
        this.dishes = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getMeals() {
    this.service.getAllMeals().subscribe(
      (res) => {
        console.log(res);
        this.meals = new Array();
        this.meals = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getMonth(result: Date): void {
    let d = moment(result);
    let reminder = d.date() % 7;
    let firstDay;
    let firstDayNumb;

    if (d.isoWeekday() >= reminder) {
      firstDay = this.getDay(d.isoWeekday() - reminder + 1);
      firstDayNumb = d.isoWeekday() - reminder + 1
    }
    else if (d.isoWeekday() < reminder) {
      firstDay = this.getDay(d.isoWeekday() + reminder);
      firstDayNumb = d.isoWeekday() + reminder;
    }

    this.dayDates = new Array()
    for (let i = 1; i <= 7; i++) {
      this.meals.forEach(element => {
        let dayDate: DayDate = new DayDate();
        dayDate.day = this.getDay(i);
        dayDate.dates = new Array();
        dayDate.dishIds = new Array();
        dayDate.mealId = element.MealID;
        dayDate.mealName = element.Description;

        this.dayDates.push(dayDate);
      });
    }

    let dayNumb = firstDayNumb;
    for (let i = 1; i <= d.daysInMonth(); i++) {
      this.meals.forEach(element => {
        let month = d.month() + 1;
        let date: Date = new Date((d.year() + '-' + month + '-' + i).toString());
        this.dayDates.find(x => x.day === this.getDay(dayNumb) && x.mealId === element.MealID).dates.push(date);
      });
      dayNumb += 1;
      if (dayNumb > 7) dayNumb = 1;
    }
  }


  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate1 = moment(stopDate);

    while (currentDate <= stopDate1) {

        dateArray.push(moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

  getWeek(result: any): void {
    debugger;
    let array1 = this.getDates(result[0],result[1]);
    console.log(array1);
    console.log(array1.filter(x => x.id === 5));
    
    let array = result;
    this.dayDates = new Array();
    for (let index in array) {
     console.log(index);
     let d = moment(result[index]);
     let day: number = d.date() - d.isoWeekday() + 1;
      let date;
      if (day > 0) {
        date = day + '-' + d.month() + '-' + d.year();
        let nextDay = day;
        let monthCheck = 1;
        
        for (let i = 1; i <= 7; i++) {
          this.meals.forEach(element => {
            let dayDate: DayDate = new DayDate();
            dayDate.day = this.getDay(i);
            dayDate.dates = new Array();
            dayDate.dishIds = new Array();
            let month = d.month() + monthCheck;
            dayDate.dates.push(new Date((d.year() + '-' + month + '-' + nextDay).toString()));
  
            dayDate.mealId = element.MealID;
            dayDate.mealName = element.Description;
  
            this.dayDates.push(dayDate);
          });
          nextDay += 1;
          if (nextDay > d.daysInMonth()) {
            monthCheck += 1;
            nextDay = nextDay - d.daysInMonth();
          }
        }
      } else {
        date = this.getDaysofPreviousMonth(result) + day + '-' + d.month() + '-' + d.year();
        let nextDay = this.getDaysofPreviousMonth(result) + day;
        let monthCheck = 0;
        this.dayDates = new Array();
        for (let i = 1; i <= 7; i++) {
          this.meals.forEach(element => {
            let dayDate: DayDate = new DayDate();
            dayDate.day = this.getDay(i);
            dayDate.dates = new Array();
            dayDate.dishIds = new Array();
            let month = d.month() + monthCheck;
            dayDate.dates.push(new Date((d.year() + '-' + month + '-' + nextDay).toString()));
  
            dayDate.mealId = element.MealID;
            dayDate.mealName = element.Description;
  
            this.dayDates.push(dayDate);
          });
  
          nextDay += 1;
          if (nextDay > this.getDaysofPreviousMonth(result)) {
            monthCheck += 1;
            nextDay = nextDay - this.getDaysofPreviousMonth(result);//this.getDaysofNextMonth(result);
          }
        }
      }

    };
  }



  // getWeek(result: any): void {
  //   debugger;
  //   console.log(result);
  //   let d = moment(result);
  //   let d1 = result as any[];
  //   for (let item of d1) {
  //     console.log(item);
  // }
   
  //   let day: number = d.date() - d.isoWeekday() + 1;
  //   let date;
  //   if (day > 0) {
  //     date = day + '-' + d.month() + '-' + d.year();
  //     let nextDay = day;
  //     let monthCheck = 1;
  //     this.dayDates = new Array();
  //     for (let i = 1; i <= 7; i++) {
  //       this.meals.forEach(element => {
  //         let dayDate: DayDate = new DayDate();
  //         dayDate.day = this.getDay(i);
  //         dayDate.dates = new Array();
  //         dayDate.dishIds = new Array();
  //         let month = d.month() + monthCheck;
  //         dayDate.dates.push(new Date((d.year() + '-' + month + '-' + nextDay).toString()));

  //         dayDate.mealId = element.MealID;
  //         dayDate.mealName = element.Description;

  //         this.dayDates.push(dayDate);
  //       });
  //       nextDay += 1;
  //       if (nextDay > d.daysInMonth()) {
  //         monthCheck += 1;
  //         nextDay = nextDay - d.daysInMonth();
  //       }
  //     }
  //   } else {
  //     date = this.getDaysofPreviousMonth(result) + day + '-' + d.month() + '-' + d.year();
  //     let nextDay = this.getDaysofPreviousMonth(result) + day;
  //     let monthCheck = 0;
  //     this.dayDates = new Array();
  //     for (let i = 1; i <= 7; i++) {
  //       this.meals.forEach(element => {
  //         let dayDate: DayDate = new DayDate();
  //         dayDate.day = this.getDay(i);
  //         dayDate.dates = new Array();
  //         dayDate.dishIds = new Array();
  //         let month = d.month() + monthCheck;
  //         dayDate.dates.push(new Date((d.year() + '-' + month + '-' + nextDay).toString()));

  //         dayDate.mealId = element.MealID;
  //         dayDate.mealName = element.Description;

  //         this.dayDates.push(dayDate);
  //       });

  //       nextDay += 1;
  //       if (nextDay > this.getDaysofPreviousMonth(result)) {
  //         monthCheck += 1;
  //         nextDay = nextDay - this.getDaysofPreviousMonth(result);//this.getDaysofNextMonth(result);
  //       }
  //     }
  //   }
  // }



  getRange(result: Date[]) {


    let firstDate = moment(result[0]);
    let firstDayNumb = firstDate.isoWeekday();
    let firstDay = this.getDay(firstDayNumb);

    let secondDate = moment(result[1]);
    let secondDayNumb = secondDate.isoWeekday();
    let secondDay = this.getDay(secondDayNumb);

    console.log(firstDay, secondDay);

    this.dayDates = new Array()
    for (let i = 1; i <= 7; i++) {
      this.meals.forEach(element => {
        let dayDate: DayDate = new DayDate();
        dayDate.day = this.getDay(i);
        dayDate.dates = new Array();
        dayDate.dishIds = new Array();
        dayDate.mealId = element.MealID;
        dayDate.mealName = element.Description;

        this.dayDates.push(dayDate);
      });
    }

    let dayNumb = firstDayNumb;
    let nextYear = firstDate.year();
    let nextMonth = firstDate.month();
    let nextDay = firstDayNumb;

    console.log(nextMonth, nextYear);

    for (let i = firstDate.date(); ;) {
      let date: Date = new Date();
      this.meals.forEach(element => {
        let month = nextMonth + 1;
        date = new Date((nextYear + '-' + month + '-' + i).toString());
        let day = moment(date).isoWeekday();
        console.log(day, date.getDay(), this.getDay(moment(date).isoWeekday()));
        this.dayDates.find(x => x.day === this.getDay(day) && x.mealId === element.MealID).dates.push(date);
      });

      if (nextMonth === secondDate.month() && i === secondDate.date() && nextYear === secondDate.year()) break;

      i += 1;
      if (i > moment(date).daysInMonth()) {
        i = 1;
        nextMonth += 1;
        if (nextMonth >= 12) {
          nextYear += 1;
          nextMonth = 0;
        }
        // i = i - moment(date).daysInMonth();
      }
    }
  }

  getDay(dayOfWeek: number): string {
    if (dayOfWeek === 1) return "Monday";
    else if (dayOfWeek === 2) return "Tuesday";
    else if (dayOfWeek === 3) return "Wednesday";
    else if (dayOfWeek === 4) return "Thursday";
    else if (dayOfWeek === 5) return "Friday";
    else if (dayOfWeek === 6) return "Saturday";
    else if (dayOfWeek === 7) return "Sunday";
  }

  getDaysofPreviousMonth(date: Date): number {
    let month: number = moment(date).month(); /// gives month -1
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) return 31;
    else if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
    else if (month === 2) {
      if (moment(date).isLeapYear()) return 29;
      else return 28;
    }
  }

  getDaysofNextMonth(date: Date): number {
    let month: number = moment(date).month() + 1; /// gives month -1
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) return 31;
    else if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
    else if (month === 2) {
      if (moment(date).isLeapYear()) return 29;
      else return 28;
    }
  }

  getDate(date) {
    if (date != undefined && date != null) {
      var d = moment(date);
      // return d.format('YYYY-MM-DD');
      return d.format('DD-MM-YYYY');
    }
    return 'N/A';
  }

  saveAll(data: DayDate, mealId: number) {
    this.saveItems = new Array();
    data.dates.forEach(element => {
      data.dishIds.forEach(ele => {
        let item: MenuDetail = {
          DishID: ele,
          DishTypeID: this.dishes.find(x => x.MenuDishID === ele).DishTypeID,
          MealID: mealId,
          MenuDate: element.toString(),
          MenuDetailID: 0,
          isActive: true,
          fkMenuID: this.mealId
        };
        this.saveItems.push(item);
      });
    });
    console.log(this.saveItems);

    //convert Date format
    this.saveItems.forEach(item=>{

      item.MenuDate=this.datePipe.transform(item.MenuDate, 'yyyy-MM-dd');
    });

    this.service.saveAllMenuDetails(this.saveItems).subscribe(
      (res) => {
        data.isSaved = true;
        this.saveItems = new Array();
      },
      (error) => {
        console.log(error);
      });
  }

  cancel() {
    this.router.navigateByUrl("/dashboard");
  }

  onChange(e: Date[]) {
    console.log(e[0], e[1])
    console.log(moment(e[0]).hour() + ":" + moment(e[0]).minute(), moment(e[1]).hour() + ":" + moment(e[1]).minute())
  }

  saveMenu() {
    this.isConfirmLoading = true;

    let temp= new Menu();
    temp.Description=this.mealDescription;
    var body=JSON.stringify(temp);

    //var body: string = JSON.stringify({ Description: this.mealDescription, TimeFrom: this.startTime.hour + ":" + this.startTime.minute, TimeTo: this.endTime.hour + ":" + this.endTime.minute });
    this.service.saveMenu(body).subscribe(
      (res) => {
        if (res) {
          console.log("Save Menu Response");
          console.log(res);
          this.mealId = res.MenuID;
          this.isAddTemplate = true;
          this.isConfirmLoading = false;
        }
      },
      (error) => {
        console.log(error);
      });

  }

  checkHour(check) {
    if (check === 'start') {
      if (this.startTime.hour > 23) this.startTime.hour = 0;
      if (this.startTime.hour < 0) this.startTime.hour = 23
    } else if (check === 'end') {
      if (this.endTime.hour > 23) this.endTime.hour = 0;
      if (this.endTime.hour < 0) this.endTime.hour = 23
    }
  }

  checkMinute(check) {
    if (check === 'start') {
      if (this.startTime.minute > 59) this.startTime.minute = 0;
      if (this.startTime.minute < 0) this.startTime.minute = 59
    } else if (check === 'end') {
      if (this.endTime.minute > 59) this.endTime.minute = 0;
      if (this.endTime.minute < 0) this.endTime.minute = 59
    }
  }
  publishMenu() {
    let data: ClientMenu = new ClientMenu();
    data.fkMenuID = this.mealId;
    let body=JSON.stringify(data);
    this.service.publishMenu(body).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.router.navigateByUrl('/dashboard');
        }
      },
      (error) => {
        console.log(error);
      });
  }
}
