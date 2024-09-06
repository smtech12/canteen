import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApilayerService } from '../../apilayer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meals } from 'src/app/Models/Meals';

declare let $: any;

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor(private Router: Router, private route: ActivatedRoute, private API: ApilayerService,
    private formBuilder: FormBuilder) {

      this.Router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.Router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.Router.navigated = false;
        }
      });

  }

  admin = false;

  Meals: Meals
  ArrMeals: any;
  pageOfItems: Array<any>;
  items = [];
  Allitems = [];

  mySubscription: any;
  searchText: string = '';

  Desc: string = "";
  TF: string = "";
  TT: string = "";
  MealID: string = "";
  chk1: boolean = true;
  form: FormGroup;
  submitted = false;
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Description: ['', Validators.required],
      TimeFrom: ['', Validators.required],
      TimeTo: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );

    this.FillMeals();
  }

  ResetForm() {
    $("#CreateMealModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/meals']);
  }

  ClearValidations() {

    this.form = this.formBuilder.group({
      Description: ['', Validators.nullValidator],
      TimeFrom: ['', Validators.nullValidator],
      TimeTo: ['', Validators.nullValidator],
      ID: ['', Validators.nullValidator]
    }
    );
  }

  OpenModal() {
    //this.form.markAsUntouched();
    $("#CreateMealModal").modal('show');
    this.ClearAllFields();
  }

  CreateMeal(MealID, Description, TimeFrom, TimeTo, isActive) {
    debugger;
    // stop here if form is invalid
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    if (MealID == "") {
      var body: string = JSON.stringify({ Description, TimeFrom, TimeTo, isActive });
      this.API.PostApiRequests("CreateMeal", body).then((result) => {
        this.Meals = result as Meals;
        console.log(this.Meals);
        this.FillMeals();
        alert("Meal added Successfully");
        $("#CreateMealModal").modal('hide');
        this.ClearAllFields();

      }, (err) => {
        console.log(err);
        if (err.error != null) {

        }
      });
    }
    else {
      var body: string = JSON.stringify({ MealID, Description, TimeFrom, TimeTo, isActive });
      this.API.PostApiRequests("UpdateMeal", body).then((result) => {
        this.Meals = result as Meals;
        console.log(this.Meals);
        this.FillMeals();
        alert("Meal Updated Successfully");
        $("#CreateMealModal").modal('hide');
        this.ClearAllFields();

      }, (err) => {
        console.log(err);
        if (err.error != null) {

        }
      });
    }

    this.form.markAsUntouched();
    this.ClearValidations();

  }

  public FillMeals() {
    debugger;
    this.API.GetApiRequests("SelectMeal").then((Result) => {
      this.Meals = Result as Meals;
      this.ArrMeals = this.Meals;
      this.items = Result as any[];
      this.Allitems = Result as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectMealByID(MealID) {
    this.API.GetApiRequestsByID("SelectMealByID", MealID).then((Result) => {
      this.Meals = Result as Meals;
      console.log(this.Meals);
      this.Desc = this.Meals.Description;
      this.TF = this.Meals.TimeFrom;
      this.TT = this.Meals.TimeTo;
      this.chk1 = this.Meals.isActive;
      this.MealID = MealID;

    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }


  public DeleteByID(TableName, ID) {
    debugger;
    var body: string = JSON.stringify({ TableName, ID });
    this.API.PostApiRequests("DeleteRecords", body).then((Result) => {
      this.Meals = Result as Meals;
      this.ArrMeals = this.Meals;
      //this.items = this.ArrMeals as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  CheckBoxEvent($event) {
    debugger;
    this.chk1 = $event.target.checked;
  }

  ClearAllFields() {
    this.Desc = "";
    this.TF = "";
    this.TT = "";
    this.MealID = null;
  }

  // Pagination Code
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}


