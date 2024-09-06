import { Component, OnInit } from '@angular/core';
import { ApilayerService } from 'src/app/apilayer.service';
import { AlertService } from 'src/app/alert/alert.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishType } from 'src/app/Models/DishType';

declare let $: any;

@Component({
  selector: 'app-dishtype',
  templateUrl: './dishtype.component.html',
  styleUrls: ['./dishtype.component.css']
})
export class DishtypeComponent implements OnInit {

  mySubscription: any;

  constructor(private Router: Router, private route: ActivatedRoute, private API: ApilayerService,
    private formBuilder: FormBuilder, private AlertService: AlertService) {
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

  pageOfItems: Array<any>;
  items = [];
  ObjDishType: DishType;
  ArrDishType: any;

  DishTypeID: Number = null;
  DT: string = "";
  chk1: boolean = true;
  form: FormGroup;
  submitted = false;
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {

    this.form = this.formBuilder.group({
      DishType: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );

    this.SelectDishType();
  }

  OpenModal() {
    $("#CreateDishTypeModal").modal('show');
    this.ClearAllFields();
  }

  CreateDishType(DishTypeID, DishType,isActive) {
    debugger;
    this.submitted = true;
     // stop here if form is invalid
     this.submitted = true;
     if (this.form.invalid) {
       return;
     }
    if (DishTypeID == "") {
      var body: string = JSON.stringify({ DishTypeID, DishType,isActive });
      this.API.PostApiRequests("CreateDishType", body).then((result) => {
        this.ObjDishType = result as DishType;
        if (this.ObjDishType != null) {
          this.SelectDishType();
          alert("Dish Type added Successfully");
          this.AlertService.success("Data Update Successfully");
          $("#CreateDishTypeModal").modal('hide');

          this.ClearAllFields();
        }
      }, (err) => {
        console.log(err);
        if (err.error != null) {
          this.AlertService.success("Data Not Save");
          alert("Data Not Save");
        }
      });
    }
    else {
      var body: string = JSON.stringify({ DishTypeID, DishType,isActive });
      this.API.PostApiRequests("UpdateDishType", body).then((result) => {
        this.ObjDishType = result as DishType;
        console.log(this.ObjDishType);
        alert("Dish Type Updated Successfully");
        this.SelectDishType();
        $("#CreateDishTypeModal").modal('hide');
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

  ClearValidations() {
    this.form = this.formBuilder.group({
      DishType: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    });
  }

  public DeleteByID(TableName, ID) {
    debugger;
    var body: string = JSON.stringify({ TableName, ID });
    this.API.PostApiRequests("DeleteRecords", body).then((Result) => {
      this.ObjDishType = Result as DishType;
      this.ArrDishType = this.ObjDishType;
      this.items = Result as any[];
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


  public SelectDishType() {
    debugger;
    this.API.GetApiRequests("SelectDishType").then((Result) => {
      this.ObjDishType = Result as DishType;
      this.ArrDishType = this.ObjDishType;
      this.items = Result as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectDishTypeByID(DishTypeID) {
    debugger;
    this.API.GetApiRequestsByID("SelectDishTypeByID", DishTypeID).then((Result) => {
      this.ObjDishType = Result as DishType;
      console.log(this.ObjDishType);
      this.DT = this.ObjDishType.DishType;
      this.DishTypeID = this.ObjDishType.DishTypeID;
      this.chk1 = this.ObjDishType.isActive;
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  ResetForm() {
    $("#CreateDishTypeModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/dishtype']);
  }


  ClearAllFields() {
    this.DT = "";
    this.DishTypeID = null;
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
