import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApilayerService } from '../../apilayer.service';
import { FormBuilder } from '@angular/forms';
import {VMAddMenu} from 'src/app/Models/VMAddMenu'
import {Meals} from 'src/app/Models/Meals'
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {

  constructor(private Router: Router, private route: ActivatedRoute, private API: ApilayerService,
    private formBuilder: FormBuilder) { 
      
    }

  VMAddMenu : VMAddMenu;
  ArrVMAddMenu : any;

  objMeals: Meals;
  ArrMeals: any;

  selectedCars = [3];
  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab', disabled: true },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];

  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP', disabled: true},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];
  selected = [
    {id: 2, name: 'Node Js'},
    {id: 8, name: 'ReactJs'}
  ];

  ngOnInit() {
    this.SelectMeals();
  }


  FetchData(FromData, ToDate) {
    debugger;
    var body: string = JSON.stringify({ FromData, ToDate});
    this.API.PostApiRequests("SelectCalculatedDays", body).then((result) => {
    this.VMAddMenu = result as VMAddMenu;
    this.ArrVMAddMenu = this.VMAddMenu;
    console.log(this.VMAddMenu);
   
    }, (err) => {
      console.log(err);
      if (err.error != null) {

      }
    });

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

}
