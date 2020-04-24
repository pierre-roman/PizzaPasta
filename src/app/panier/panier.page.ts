import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  constructor(private panierService: PanierService) { }
  
  ngOnInit() {
  }

  getPrice(){
    var price = 0;
    for(let i in this.panierService.panier){
      price = price + (this.panierService.panier[i].nbre * this.panierService.panier[i].pizza.prix)
    }
    return price;
  }
}
