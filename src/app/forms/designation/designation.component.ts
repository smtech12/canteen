import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApilayerService } from '../../apilayer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Designation } from 'src/app/Models/Designation';
declare let $: any;


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

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
  
  p: number = 1;
  admin = false;

  Designation: Designation
  ArrDesignation: any;
  pageOfItems: Array<any>;
  items = [];

  mySubscription: any;

  Desig: string = "";
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
      Designation: ['', Validators.required]

    }
    );

    this.FillDesignations();
  }

  ResetForm() {
    $("#CreateDesignationModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/designation']);
  }

  ClearValidations() {

    this.form = this.formBuilder.group({
      Designation: ['', Validators.nullValidator]
    }
    );
  }

  OpenModal() {
    //this.form.markAsUntouched();
    $("#CreateDesignationModal").modal('show');
    this.ClearAllFields();
  }

  CreateMeal(Designation) {
    debugger;
    // stop here if form is invalid
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var body: string = JSON.stringify({ Designation});
    this.API.PostApiRequests("CreateDesignation", body).then((result) => {
      this.Designation = result as Designation;
      console.log(this.Designation);
      this.FillDesignations();
      alert("Designation added Successfully");
      $("#CreateDesignationModal").modal('hide');
      this.ClearAllFields();

    }, (err) => {
      console.log(err);
      if (err.error != null) {

      }
    });



    this.form.markAsUntouched();
    this.ClearValidations();

  }

  public FillDesignations() {
    debugger;
    this.API.GetApiRequests("SelectDesignation").then((Result) => {
      this.Designation = Result as Designation;
      this.ArrDesignation = this.Designation;
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

  ClearAllFields() {
    this.Desig = "";
  }

  // Pagination Code
  onChangePage(pageOfItems: Array<any>) {
    debugger;
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
