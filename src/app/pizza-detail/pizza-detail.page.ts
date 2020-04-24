import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Pizza from '../models/pizza';
import { switchMap } from 'rxjs/operators';
import { IngredientService } from '../services/ingredient.service';
import Ingredient from '../models/ingredient';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.page.html',
  styleUrls: ['./pizza-detail.page.scss'],
})
export class PizzaDetailPage implements OnInit {

  pizza: Pizza;
  ingredients: Array<Ingredient>;

  constructor(private route : ActivatedRoute, private ingredientService: IngredientService) { 
    this.ingredients = [];
   }

  ngOnInit() {
    this.route.params
    .subscribe((pizza) => {
      this.pizza = new Pizza(+pizza.id, pizza.nom, pizza.photo, +pizza.prix, pizza.ingredients.split(',').map(function(item) {
        return parseInt(item, 10);
      }));
      for(let i in pizza.ingredients){
        this.ingredientService.getOneIngredient(pizza.ingredients[i]).subscribe((ingredient) => {
          console.log("ingredient", ingredient)
          this.ingredients.push(ingredient);
        })
      }
      console.log(this.pizza);
      // your data-specific code goes here
    });
  }
  

}
