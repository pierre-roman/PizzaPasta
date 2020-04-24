import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { PizzaService } from '../services/pizza.service';
import Ingredient from '../models/ingredient';
import Pizza from '../models/pizza';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  listeIngredients: Array<Ingredient>
  listePizza: Array<Pizza>

  constructor(private ingredientService: IngredientService, private pizzaService: PizzaService) { }

  ngOnInit() {
    this.ingredientService.getIngredient().subscribe(ingredients => this.listeIngredients = ingredients);
    this.pizzaService.getPizza().subscribe(pizzas => this.listePizza = pizzas);
  }



}
