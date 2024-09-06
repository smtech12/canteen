import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApilayerService } from '../../apilayer.service';
import { Employee } from 'src/app/Models/Employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Designation } from 'src/app/Models/Designation';
import { Contractor } from 'src/app/Models/Contractor';

declare let $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  mySubscription: any;
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

  objEmployee: Employee
  ArrEmployee: any;
  pageOfItems: Array<any>;
  items = [];
  chk1: boolean = true;
  chk2: boolean = true;
  chk3: boolean = true;
  Nam: string = "";
  Desig: string = "";
  RFCode: string = "";
  EMPID: Number = null;
  Designation: Designation
  ArrDesignation: any;
  ddlDesID: Number = null;

  Contractor: Contractor
  ArrContractor: any;
  ddlConID: Number = null;

  form: FormGroup;
  submitted = false;
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {

    this.form = this.formBuilder.group({
      EmployeeName: ['', Validators.required],
      EmployeeDesignation: ['', Validators.required],
      EmployeeRFID: ['', Validators.required],
      ddlDesignation: ['', Validators.required],
      ddlContractors: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );

    this.SelectEmployee();
    this.FillContractor();
    this.FillDesignations();
  }

  OpenModal() {
    $("#CreateEmployeeModal").modal('show');
    this.ClearAllFields();
  }
  ResetForm() {
    $("#CreateEmployeeModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/employees']);
  }


  CreateEmployee(EmployeeID, Name, Designation, RFIDCde, isActive, PrintSlip, AllowGuest,DesignationID,ContractorID) {
    debugger;
    // stop here if form is invalid
    isActive = this.chk1;
    PrintSlip = this.chk2;
    AllowGuest = this.chk3;

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (EmployeeID == "") {

      var body: string = JSON.stringify({ Name, Designation, RFIDCde, isActive, PrintSlip, AllowGuest,DesignationID,ContractorID });
      this.API.PostApiRequests("CreateEmployee", body).then((result) => {
        this.objEmployee = result as Employee;
        console.log(this.objEmployee);
        this.SelectEmployee();
        alert("Employee added Successfully");
        $("#CreateEmployeeModal").modal('hide');
        this.ClearAllFields();

      }, (err) => {
        console.log(err);
        if (err.error != null) {

        }
      });
    }
    else {
      var body: string = JSON.stringify({ EmployeeID, Name, Designation, RFIDCde, isActive, PrintSlip, AllowGuest,DesignationID,ContractorID });
      this.API.PostApiRequests("UpdateEmployee", body).then((result) => {
        this.objEmployee = result as Employee
        this.SelectEmployee();
        alert("Employee Updated Successfully");
        $("#CreateEmployeeModal").modal('hide');
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
      EmployeeName: ['', Validators.nullValidator],
      EmployeeDesignation: ['', Validators.nullValidator],
      EmployeeRFID: ['', Validators.nullValidator],
      ID: ['', Validators.nullValidator]
    }
    );
  }

  public SelectEmployee() {
    this.API.GetApiRequests("SelectEmployee").then((Result) => {
      this.objEmployee = Result as Employee;
      this.ArrEmployee = this.objEmployee;
      this.items = Result as any[];

      console.log(this.items);

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
      this.objEmployee = Result as Employee;
      this.ArrEmployee = this.objEmployee;
      this.items = Result as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectEmployeeByID(EmployeeID) {
    this.API.GetApiRequestsByID("SelectEmployeeByID", EmployeeID).then((Result) => {
      this.objEmployee = Result as Employee;
      console.log(this.objEmployee);
      this.Nam = this.objEmployee.Name;
      this.Desig = this.objEmployee.Designation;
      this.RFCode = this.objEmployee.RFIDCde;
      this.EMPID = EmployeeID;
      this.chk1 = this.objEmployee.isActive;
      this.chk2 = this.objEmployee.PrintSlip;
      this.chk2 = this.objEmployee.AllowGuest;
      this.ddlConID = this.objEmployee.ContractorID;
      this.ddlDesID = this.objEmployee.DesignationID;

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

  ChkPrintSlip($event) {
    debugger;
    this.chk2 = $event.target.checked;
  }

  ChkAllowGuest($event) {
    debugger;
    this.chk3 = $event.target.checked;
  }

  public FillDesignations() {
    debugger;
    this.API.GetApiRequests("SelectDesignation").then((Result) => {
      this.Designation = Result as Designation;
      this.ArrDesignation = this.Designation;
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectDesignationByID(ID) {
    this.API.GetApiRequestsByID("SelectDesignationByID", ID).then((Result) => {
      this.Designation = Result as Designation;
      console.log(this.Designation);
      this.ddlDesID = this.Designation.DesignationID;
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public FillContractor() {
    debugger;
    this.API.GetApiRequests("SelectContractor").then((Result) => {
      this.Contractor = Result as Contractor;
      this.ArrContractor = this.Contractor;
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectContractorByID(ID) {
    debugger;
    this.API.GetApiRequestsByID("SelectContractorByID", ID).then((Result) => {
      this.Contractor = Result as Contractor;
      this.ArrContractor = Result as Contractor;
      this.ddlConID = this.Contractor.ContractorID;
    },
      (err) => {
        console.log(err);
        if (err.error != null) {
        }
      }
    );
  }


  ClearAllFields() {
    this.Nam = "";
    this.Desig = "";
    this.RFCode = "";
    this.EMPID = null;
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
