import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApilayerService } from 'src/app/apilayer.service';
import { FormBuilder } from '@angular/forms';
import { MenuDetail } from 'src/app/Models/MenuDetail';
import { VMMenuDish } from 'src/app/Models/VMMenuDish';
import { DishType } from 'src/app/Models/DishType';
import { Meals } from 'src/app/Models/Meals';

declare let $: any;

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {

  constructor(private Router: Router, private route: ActivatedRoute, private API: ApilayerService,
    private formBuilder: FormBuilder) { }

    objMenuDetail : MenuDetail;
    ArrMenuDetail : any;
    objVMMenuDetail : MenuDetail;
    ArrVMMenuDetail : any;
    objDishType: DishType
    ArrDishType: any;
    objVMMenuDish: VMMenuDish;
    ArrVMMenuDish : any;
    objMeals: Meals;
    ArrMeals: any;
    pageOfItems: Array<any>;
    items = [];
    menuId:number;

    MDID: Number = null;
    MeaID: Number = null ;
    DTID: Number = null;
    DID : Number = null;
    MDate : string = "";

  ngOnInit() {

    debugger;
    const app_id =this.route.snapshot.queryParams.id;
      if(app_id!=undefined)
      {

        console.log("Appointment Id: "+app_id);
        this.menuId=app_id ;
      }
    this.SelectMenuDetail();
    this.SelectDishType();
    this.SelectMeals();
    this.SelectMenuDish();
  }


  CreateMenuDetail(MenuDetailID ,DishID,MealID, DishTypeID, MenuDate) {
    debugger;
    if(MenuDetailID == "")
    {
      var body: string = JSON.stringify({ MealID, DishTypeID, DishID,MenuDate });
      this.API.PostApiRequests("CreateMenuDetail", body).then((result) => {
        this.objMenuDetail = result as MenuDetail;

        this.SelectMenuDetail();
        $("#CreateMenuDetailModal").modal('hide');
        this.ClearAllFields();
      }, (err) => {
        console.log(err);
        if (err.error != null) {

        }
      });
    }
    else{
      var body: string = JSON.stringify({MenuDetailID, MealID, DishTypeID, DishID,MenuDate });
      this.API.PostApiRequests("UpdateMenuDetail", body).then((result) => {
        this.objMenuDetail = result as MenuDetail;

        this.SelectMenuDetail();
        $("#CreateMenuDetailModal").modal('hide');
        this.ClearAllFields();

      }, (err) => {
        console.log(err);
        if (err.error != null) {

        }
      });
    }
  }

  public SelectMenuDetail() {
    debugger;
    let endpoint="SelectMenuDetailByMenuId?menuId="+this.menuId;
    this.API.GetApiRequests(endpoint).then((Result) => {
      this.objMenuDetail = Result as MenuDetail;
      this.ArrMenuDetail = this.objMenuDetail;
      this.items = Result as any[];
      console.log(this.ArrMenuDetail);
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectMenuDetailByID(MenuDetailID) {
    debugger;
    this.API.GetApiRequestsByID("SelectMenuDetailByID", MenuDetailID).then((Result) => {
      this.objMenuDetail = Result as MenuDetail;

      this.MDID = this.objMenuDetail.MenuDetailID;
      this.MeaID = this.objMenuDetail.MealID;
      this.DID = this.objMenuDetail.DishID;
      this.DTID = this.objMenuDetail.DishTypeID;
      this.MDate = this.objMenuDetail.MenuDate;

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


  public SelectMenuDish() {
    this.API.GetApiRequests("SelectMenuDish").then((Result) => {
      this.objVMMenuDish = Result as VMMenuDish;
      this.ArrVMMenuDish = this.objVMMenuDish;
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  public SelectMeals() {
    debugger;
    this.API.GetApiRequests("SelectMeal").then((Result) => {
      this.objMeals = Result as Meals;
      this.ArrMeals = this.objMeals;
    },
      (err) => {
        console.log(err);
        if (err.error != null) {

        }
      }
    );
  }

  ClearAllFields()
  {

    this.MDID = null;
    this.MeaID = null;
    this.DID = null;
    this.DTID = null;
    this.MDate = "";
  }

   // Pagination Code
   onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

}
