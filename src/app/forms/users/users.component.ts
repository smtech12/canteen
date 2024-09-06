import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApilayerService } from '../../apilayer.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Users } from 'src/app/Models/Users';

declare let $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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
  
  objUsers: Users
  ArrUsers: any;
  pageOfItems: Array<any>;
  items = [];
  chk1: boolean = true;
  UN: string = "";
  UP: string = "" ;
  UT: string = "";
  UID : string = "";

  form: FormGroup;
  submitted = false;
   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }


  ngOnInit() {
    this.form = this.formBuilder.group({
      UserName: ['', Validators.required],
      UserPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      //UserType: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );

    this.SelectUser();
  }

  OpenModal() {
    $("#CreateUserModal").modal('show');
    this.ClearAllFields();
  }

  ResetForm() {
    $("#CreateUserModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/users']);
  }
  CreateUser(UserID, UserName, UserPassword, UserType) {
   
      // stop here if form is invalid
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }

    if(UserID == "")
    {
      var body: string = JSON.stringify({ UserName, UserPassword, UserType });
      this.API.PostApiRequests("CreateUser", body).then((result) => {
        this.objUsers = result as Users;
        this.SelectUser();
        alert("User Added Successfully");
        $("#CreateUserModal").modal('hide');
        this.ClearAllFields();
  
      }, (err) => {
        console.log(err);
        if (err.error != null) {
  
        }
      });
    }
    else{
      var body: string = JSON.stringify({ UserID,UserName, UserPassword, UserType });
      this.API.PostApiRequests("UpdateUser", body).then((result) => {
        this.objUsers = result as Users;
        this.SelectUser();
        alert("User Updated Successfully");
        $("#CreateUserModal").modal('hide');
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
      UserName: ['', Validators.required],
      UserPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );
  }

  public SelectUser() {
    debugger;
    this.API.GetApiRequests("SelectUser").then((Result) => {
      this.objUsers = Result as Users;
      this.ArrUsers = this.objUsers;
      this.items = Result as any[];
      console.log(this.ArrUsers);
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public DeleteByID(TableName,ID) {
    debugger;
    var body: string = JSON.stringify({ TableName,ID });
    this.API.PostApiRequests("DeleteRecords",body).then((Result) => {
      this.objUsers = Result as Users;
      this.ArrUsers = this.objUsers;
      this.items = Result as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectUserByID(UserID) {
    debugger;
    this.API.GetApiRequestsByID("SelectUserByID", UserID).then((Result) => {
      this.objUsers = Result as Users;
      this.UN = this.objUsers.UserName;
      this.UP = this.objUsers.UserPassword;
      this.UT = this.objUsers.UserType;
      this.UID = UserID;
      this.chk1 = this.objUsers.isActive;

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


  ClearAllFields()
  {
    this.UN = "";
    this.UP = "";
    this.UT = "";
    this.UID = null;
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
