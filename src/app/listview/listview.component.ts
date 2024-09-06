import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApilayerService } from 'src/app/apilayer.service';
import { FormBuilder } from '@angular/forms';
import { VMMealDetail } from 'src/app/Models/VMMealDetail';


@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  constructor(private Router: Router, private route: ActivatedRoute, private API: ApilayerService,
    private formBuilder: FormBuilder) { }
    objVMMealDetail : VMMealDetail;
    ArrVMMealDetail : any;
    ArrVMMealDetailList :any;
  
    DishType : any;
    DishName : any;
    DishDesc : any;
    TimeFrom : any;
    Day : any;

    DishType1 : any;
    DishName1 : any;
    DishDesc1 : any;
    TimeFrom1 : any;
    Day1 : any;

    ServeWith : any;
    Fruit : any;

  ngOnInit() {
    this.SelectMenuDetailList();
  }

  
  public SelectMenuDetailList() {
    this.API.GetApiRequests("SelectMealDetailList").then((Result) => {
      this.objVMMealDetail = Result as VMMealDetail;
      this.ArrVMMealDetail = this.objVMMealDetail;
      this.DishName = this.objVMMealDetail[0].DishName;
      this.DishDesc = this.objVMMealDetail[0].DishDesc;

      console.log(this.objVMMealDetail);
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }


  
  public SelectMenuDetailByDate(MealDate) {
    var splitted = MealDate.split("/", 3);
    console.log(splitted);
    debugger;
    this.API.GetApiRequestsByID("SelectMealDetailByDate", splitted).then((Result) => {
      this.objVMMealDetail = Result as VMMealDetail;
      this.ArrVMMealDetailList = this.objVMMealDetail;
      this.DishType = this.ArrVMMealDetailList[0].DishType;
      this.DishName = this.ArrVMMealDetailList[0].DishName;
      this.DishDesc = this.ArrVMMealDetailList[0].DishDesc;
      this.TimeFrom = this.ArrVMMealDetailList[0].TimeFrom;
      this.Day = this.ArrVMMealDetailList[0].Day;

      this.DishType = this.ArrVMMealDetailList[1].DishType;
      this.DishName = this.ArrVMMealDetailList[1].DishName;
      this.DishDesc = this.ArrVMMealDetailList[1].DishDesc;
      this.TimeFrom = this.ArrVMMealDetailList[1].TimeFrom;
      this.Day = this.ArrVMMealDetailList[1].Day;

      //console.log(this.ArrVMMealDetailList);
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }



}
