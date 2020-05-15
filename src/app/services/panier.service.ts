import { Injectable } from '@angular/core';
import Pizza from '../models/pizza';
import { PizzaService } from './pizza.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panier: Array<any>;
  subcribedPizz: Array <Subscription>

  constructor(private pizzaService: PizzaService) {
    this.panier = [];
    this.subcribedPizz = [];
  }

  getArticleById(id: number){
    for(let i in this.panier){
      if(this.panier[i].pizza.id == id){
        return this.panier[i];
      }
    }
  }

  getLength(){
    var nbrePizz = 0;
    for(let i in this.panier){
      nbrePizz += this.panier[i].nbre
    }
    return nbrePizz;
  }

  addPizza(pizza: Pizza){
    
    var pizzaExist = this.checkInPanier(pizza);
    if(pizzaExist != -1){
      this.panier[pizzaExist].nbre += 1;
    }
    else{
      var newPizzPos = this.panier.push({nbre: 1, pizza: pizza}) - 1;
      this.subcribedPizz[pizza.id] = this.pizzaService.getOnePizza(pizza.id).subscribe(pizza => this.getArticleById(pizza.id).pizza = pizza);   
    }
  }

  removeOnePizza(pizza: Pizza){
    
    var pizzaExist = this.checkInPanier(pizza);

    
    if(pizzaExist != -1){
      if(this.panier[pizzaExist].nbre - 1 > 0){
        this.panier[pizzaExist].nbre -= 1;
      }else{
        this.removePizza(pizza);
      }
    }
  }

  removePizza(pizza: Pizza){
    var pizzaExist = this.checkInPanier(pizza);
    if(pizzaExist != -1){
      this.panier.splice(pizzaExist, 1);
      this.subcribedPizz[pizza.id].unsubscribe();
    }
  }

  checkInPanier(pizza: Pizza){
    for(let i = 0; i < this.panier.length ; i++){
      
      if(this.panier[i].pizza.id == pizza.id){
        return i;
      }
    }
    return -1
  }

}
