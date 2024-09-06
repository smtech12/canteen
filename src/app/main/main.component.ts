import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApilayerService } from 'src/app/apilayer.service';
import { FormBuilder } from '@angular/forms';
import { VMMealDetail } from 'src/app/Models/VMMealDetail';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private Router: Router, private route: ActivatedRoute, private API: ApilayerService,
    private formBuilder: FormBuilder) { }

  objVMMealDetail : VMMealDetail;
  
  Date : any;
  Day : any;
  Year : any;
  DishName : any;
  DishDesc : any;
  ServeWith : any;
  Fruit : any;
  

  ngOnInit() {

    this.SelectMenuDetail();

    let date: Date = new Date();  
    this.Date = date.getDate();
    this.Day = "Wednesday";
    this.Year = date.getFullYear();
  }

  public SelectMenuDetail() {
    this.API.GetApiRequests("SelectMealDetail").then((Result) => {
      this.objVMMealDetail = Result as VMMealDetail;
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


}
