import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApilayerService } from '../../apilayer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contractor } from 'src/app/Models/Contractor';

declare let $: any;

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {

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

  Contractor: Contractor
  ArrContractor: any;
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
      Contractor: ['', Validators.required]

    }
    );

    this.FillContractor();
  }

  ResetForm() {
    $("#CreateContractorModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/Contractor']);
  }

  ClearValidations() {

    this.form = this.formBuilder.group({
      Contractor: ['', Validators.nullValidator]
    }
    );
  }

  OpenModal() {
    //this.form.markAsUntouched();
    $("#CreateContractorModal").modal('show');
    this.ClearAllFields();
  }

  CreateContractor(ContractorName) {
    debugger;
    // stop here if form is invalid
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var body: string = JSON.stringify({ ContractorName});
    this.API.PostApiRequests("CreateContractor", body).then((result) => {
      this.Contractor = result as Contractor;
      console.log(this.Contractor);
      this.FillContractor();
      alert("Contractor added Successfully");
      $("#CreateContractorModal").modal('hide');
      this.ClearAllFields();

    }, (err) => {
      console.log(err);
      if (err.error != null) {

      }
    });



    this.form.markAsUntouched();
    this.ClearValidations();

  }

  public FillContractor() {
    debugger;
    this.API.GetApiRequests("SelectContractor").then((Result) => {
      this.Contractor = Result as Contractor;
      this.Contractor = this.Contractor;
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
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
