import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { PizzaService } from '../services/pizza.service';
import Ingredient from '../models/ingredient';
import Pizza from '../models/pizza';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  listeIngredients: Array<Ingredient>
  listePizza: Array<Pizza>

  subscribeIngredient: Subscription;
  subscribepizza: Subscription;

  constructor(private ingredientService: IngredientService, private pizzaService: PizzaService) { }

  ngOnInit() {
    this.subscribeIngredient = this.ingredientService.getIngredient().subscribe(ingredients => this.listeIngredients = ingredients);
    this.subscribepizza = this.pizzaService.getPizza().subscribe(pizzas => this.listePizza = pizzas);
  }

  ionViewWillEnter(){
    this.subscribeIngredient.unsubscribe();
    this.subscribepizza.unsubscribe();
    this.subscribepizza = this.pizzaService.getPizza().subscribe(pizzas => this.listePizza = pizzas);
    this.subscribeIngredient = this.ingredientService.getIngredient().subscribe(ingredients => this.listeIngredients = ingredients);
  }


}
