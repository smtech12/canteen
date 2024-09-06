import { Component, OnInit } from '@angular/core';
import { ApilayerService } from 'src/app/apilayer.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  pageOfItems: Array<any>;
  items = [];
  constructor(public apiService:ApilayerService,private router: Router) { }

  ngOnInit() {
    this.getAllMenus();
  }
  getAllMenus() {
    this.apiService.getAllMenu().subscribe(
      (res) => {
        console.log(res);
        this.items=res;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  getDate(date) {
    if (date != undefined && date != null) {
      var d = moment(date);
      // return d.format('YYYY-MM-DD');
      return d.format('DD-MM-YYYY');
    }
    return 'N/A';
  }

  // Pagination Code
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }

    detele(menu){

        this.apiService.deleteMenuById(menu.MenuID).subscribe(
      (res) => {
        console.log(res);
        this.getAllMenus();;
      },
      (error) => {
        console.log(error);
      }
      )
    }

    add(){
      this.router.navigateByUrl("/addMenuDetail");
    }

    NevigateToMenuDetails(menu){
      this.router.navigate(['dashboard/menudetail'],{ queryParams: { id: menu.MenuID}});
    }
}
