import { Component, OnInit } from '@angular/core';
import Pizza from '../models/pizza';
import { PizzaService } from '../services/pizza.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  pizzaListe: Array<Pizza>;
  error: string;
  loading: boolean;

  constructor(private pizzaService : PizzaService, private panierService: PanierService) {
    this.loading = true;
    
  }

  ngOnInit (){
    this.pizzaService.getPizza().subscribe(pizzaListe => this.pizzaListe = pizzaListe,
      error => {
        this.error = error;
        this.loading = false;
    }, () => {
        this.loading = false;
    })
  }

}
