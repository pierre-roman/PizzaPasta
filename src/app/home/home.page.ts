import { Component, OnInit } from '@angular/core';
import Pizza from '../models/pizza';
import { PizzaService } from '../services/pizza.service';
import { PanierService } from '../services/panier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  pizzaListe: Array<Pizza>;
  error: string;
  loading: boolean;

  subscribePizza: Subscription;

  constructor(private pizzaService : PizzaService, protected panierService: PanierService) {
    this.loading = true;
    
  }

  ngOnInit (){
    this.subscribePizza = this.pizzaService.getPizza().subscribe(pizzaListe => this.pizzaListe = pizzaListe,
      error => {
        this.error = error;
        this.loading = false;
    }, () => {
        this.loading = false;
    })
  }

  ionViewWillEnter(){
    this.subscribePizza.unsubscribe();
    this.subscribePizza = this.pizzaService.getPizza().subscribe(pizzaListe => this.pizzaListe = pizzaListe,
      error => {
        this.error = error;
        this.loading = false;
    }, () => {
        this.loading = false;
    })
  }

}
