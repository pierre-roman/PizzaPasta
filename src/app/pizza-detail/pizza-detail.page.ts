import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      var tabIngredientId = pizza.ingredients.split(',').map(function(item) {
        return parseInt(item, 10);
      })
      
      this.pizza = new Pizza(+pizza.id, pizza.nom, pizza.photo, +pizza.prix, tabIngredientId);
      this.ingredients = [];
      for(let i in this.pizza.ingredients){
        
        this.ingredientService.getOneIngredient(this.pizza.ingredients[i]).subscribe((ingredient) => {
          this.ingredients.push(ingredient);
        })
      }
      // your data-specific code goes here
    });
  }
  

}
