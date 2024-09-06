import { Component, OnInit } from '@angular/core';
import { ApilayerService } from 'src/app/apilayer.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Collections } from 'src/app/Models/Collections';

declare let $: any;

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
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

  ObjCollection: Collections;
  ArrCollection: any;
  pageOfItems: Array<any>;
  items = [];

  fileToUpload: File = null;
  FilePath: string = "";
  Res: string = "";
  CID: Number = null;
  CP: string = "";
  FU: string = "";
  URL: string = "";
  chk1: boolean = true;
  form: FormGroup;
  submitted = false;
   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

  ngOnInit() {

    this.form = this.formBuilder.group({
      Caption: ['', Validators.required],
      Image: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );

    this.SelectCollection();
  }


  UploadFile() {
    this.API.uploadImage("Upload", "", this.fileToUpload).then((result) => {
      this.Res = result as string;
    }, (err) => {
      console.log(err);
      if (err.error != null) {

      }
    });
    return this.Res;
  }


  handleFileInput(files: FileList) {
    debugger;
    this.fileToUpload = files.item(0);

  }


  public DeleteByID(TableName,ID) {
    debugger;
    var body: string = JSON.stringify({ TableName,ID });
    this.API.PostApiRequests("DeleteRecords",body).then((Result) => {
      this.ObjCollection = Result as Collections;
      this.ArrCollection = this.ObjCollection;
      this.items = Result as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  OpenModal()
  {
    $("#CreateCollectionsModal").modal('show');
        this.ClearAllFields();
  }

  ResetForm() {
    $("#CreateCollectionsModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/collections']);
  }

  CreateCollection(CollectionID, Caption) {

     // stop here if form is invalid
     this.submitted = true;
     if (this.form.invalid) {
       return;
     }
    if (CollectionID == "") {
      this.FilePath = this.UploadFile();

      let URL = this.FilePath;
      var body: string = JSON.stringify({ Caption, URL });
      this.API.PostApiRequests("CreateCollection", body).then((result) => {
        this.ObjCollection = result as Collections;
        console.log(this.ObjCollection);
        this.SelectCollection();
        alert("Collection Added Successfully");
        $("#CreateCollectionsModal").modal('hide');
        this.ClearAllFields();
      }, (err) => {
        console.log(err);
        if (err.error != null) {

        }
      });
    }
    else {
      var body: string = JSON.stringify({ CollectionID, Caption, URL });
      this.API.PostApiRequests("UpdateCollection", body).then((result) => {
        this.ObjCollection = result as Collections;
        console.log(this.ObjCollection);
        this.SelectCollection();
        $("#CreateCollectionsModal").modal('hide');
        alert("Collection Updated Successfully");
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
      Caption: ['', Validators.required],
      Image: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    });
  }

  public SelectCollection() {
    debugger;
    this.API.GetApiRequests("SelectCollection").then((Result) => {
      this.ObjCollection = Result as Collections;
      this.ArrCollection = this.ObjCollection;
      this.items = Result as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectCollectionByID(CollectionID) {
    debugger;
    this.API.GetApiRequestsByID("SelectCollectionByID", CollectionID).then((Result) => {
      this.ObjCollection = Result as Collections;
      console.log(this.ObjCollection);
      this.CP = this.ObjCollection.Caption;
      this.CID = this.ObjCollection.CollectionID;
      this.chk1 = this.ObjCollection.isActive;

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
    this.CP = "";
    this.CID = null;
    this.FU = "";
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
