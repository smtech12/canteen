import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApilayerService } from '../apilayer.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../Models/Users'
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private Router: Router, private route: ActivatedRoute, private API: ApilayerService,
    private formBuilder: FormBuilder) {

  }

  // Variable Declarations
  //#region 
  registerForm: FormGroup;
  submitted = false;

  Users: Users

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  User: string = "";
  Password: string = "";
  Response: string = "";
  //#endregion

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    }
    );
  }

  Login(UserName, UserPassword) {
    //Form Validation
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    var body: string = JSON.stringify({ UserName, UserPassword });
    this.API.PostApiRequests("LogIn", body).then((result) => {
      this.Users = result as Users;
      console.log(this.Users);

      if (this.Users != null) {
        this.Router.navigate(['dashboard']);
      }
      else {
        alert('UserName or Password is in Correct !!');
      }
    }, (err) => {
      console.log(err);
      if (err.error != null) {

      }
    });

  }
}



