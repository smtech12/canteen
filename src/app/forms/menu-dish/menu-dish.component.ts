import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApilayerService } from '../../apilayer.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MenuDish } from 'src/app/Models/MenuDish';
import { VMMenuDish } from 'src/app/Models/VMMenuDish';
import { DishType } from 'src/app/Models/DishType';

declare let $: any;

@Component({
  selector: 'app-menu-dish',
  templateUrl: './menu-dish.component.html',
  styleUrls: ['./menu-dish.component.css']
})
export class MenuDishComponent implements OnInit {
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

    objMenuDish: MenuDish
    ArrMenuDish: any;
    objVMMenuDish: VMMenuDish;
    ArrVMMenuDish : any;
    objDishType: DishType
    ArrDishType: any;
    pageOfItems: Array<any>;
    items = [];
    chk1: boolean = true;
    MDID : Number = null;
    Nam : string = "";
    Desc : string = "" ;
    DTID : Number = null;
    Seq : Number = null;

    form: FormGroup;
    submitted = false;
     // convenience getter for easy access to form fields
     get f() { return this.form.controls; }

  ngOnInit() {

    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      DishDescription: ['', Validators.required],
      DishSequence: ['', Validators.required],
      DishType: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );

    this.SelectMenuDish();
    this.SelectDishType();
  }

  
  OpenModal()
  {
    $("#CreateMenuDishModal").modal('show');
        this.ClearAllFields();
  }

  CreateMenuDish(MenuDishID, DishName, DishTypeID, Sequence,DishDescription,isActive) {
    // stop here if form is invalid
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    if(MenuDishID == "")
    {
      var body: string = JSON.stringify({ DishName, DishDescription, DishTypeID, Sequence,isActive });
      this.API.PostApiRequests("CreateMenuDish", body).then((result) => {
        this.objMenuDish = result as MenuDish;
        console.log(this.objMenuDish);
        this.SelectMenuDish();
        alert("Dish added Successfully");
        $("#CreateMenuDishModal").modal('hide');
        this.ClearAllFields();
  
      }, (err) => {
        console.log(err);
        if (err.error != null) {
  
        }
      });
    }
    else{
      var body: string = JSON.stringify({ MenuDishID,DishName, DishTypeID, Sequence,DishDescription,isActive });
      this.API.PostApiRequests("UpdateMenuDish", body).then((result) => {
        this.objMenuDish = result as MenuDish;
        console.log(this.objMenuDish);
        this.SelectMenuDish();
        alert("Dish Updated Successfully");
        $("#CreateMenuDishModal").modal('hide');
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
      Name: ['', Validators.required],
      DishDescription: ['', Validators.required],
      DishSequence: ['', Validators.required],
      DishType: ['', Validators.required],
      ID: ['', Validators.nullValidator]
    }
    );
  }

  ResetForm() {
    $("#CreateMenuDishModal").modal('hide');
    this.Router.navigate(['dashboard/dashboard']);
    this.Router.navigate(['dashboard/menudish']);
  }

  public SelectMenuDish() {
    this.API.GetApiRequests("SelectMenuDish").then((Result) => {
      this.objVMMenuDish = Result as VMMenuDish;
      this.ArrVMMenuDish = this.objVMMenuDish;
      this.items = Result as any[];
      console.log(this.objMenuDish);
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectMenuDishByID(MealID) {
 
    this.API.GetApiRequestsByID("SelectMenuDishByID", MealID).then((Result) => {
      this.objMenuDish = Result as MenuDish;
      console.log(this.objMenuDish);
      this.Nam = this.objMenuDish.DishName;
      this.Desc = this.objMenuDish.DishDescription;
      this.DTID = this.objMenuDish.DishTypeID;
      this.Seq = this.objMenuDish.Sequence;
      this.MDID = this.objMenuDish.MenuDishID;
      this.chk1 = this.objMenuDish.isActive;
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
      this.objVMMenuDish = Result as VMMenuDish;
      this.ArrVMMenuDish = this.objVMMenuDish;
      this.items = Result as any[];
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectDishType() {
    this.API.GetApiRequests("SelectDishType").then((Result) => {
      this.objDishType = Result as DishType;
      this.ArrDishType = this.objDishType;
      console.log(this.ArrDishType);
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectDishTypeByID(DishTypeID) {
    this.API.GetApiRequestsByID("SelectDishTypeByID", DishTypeID).then((Result) => {
      this.objDishType = Result as DishType;
      console.log(this.objDishType);
      this.DTID = this.objDishType.DishTypeID;
      
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
    this.Desc = "";
    this.Nam = "";
    this.DTID = null;
    this.Seq = null;
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
