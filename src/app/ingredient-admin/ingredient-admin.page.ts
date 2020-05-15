import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientService } from '../services/ingredient.service';
import Ingredient from '../models/ingredient';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingredient-admin',
  templateUrl: './ingredient-admin.page.html',
  styleUrls: ['./ingredient-admin.page.scss'],
})
export class IngredientAdminPage implements OnInit {

  action: string;
  id: number;
  nom: string;
  error: string;

  constructor(private navCtrl:NavController, private ingredientService: IngredientService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe((ingredient) => {
      if(Object.keys(ingredient).length === 0){
        this.nom = "";
        this.action = "new";
      }else{
        this.id = ingredient.id;
        this.nom = "";
        this.ingredientService.getOneIngredient(ingredient.id).subscribe((myIngredient) => {
          this.nom = myIngredient.nom;
        })
        this.action = "edit";
      }
    })
  }

  deleteIngredient(){
    if(this.action == "edit" && this.id){
      this.ingredientService.deleteIngredient(this.id).subscribe(() => {
        this.navCtrl.pop();
      })
    }
  }

  sendIngredient(){
    if(this.nom.length > 0){
      
      switch (this.action) {
        case "new":
          this.ingredientService.postIngredient(this.nom).subscribe((newIngredient) => {
            if(newIngredient.id){
              this.id = newIngredient.id;
              this.action = "edit";
              this.navCtrl.pop();
            }
          }, (err) => {
            this.error = "une erreur est survenu lors de l'ajout de l'ingrédient";
            console.log(err);
          });
          break;
        case "edit":
          var ingredientModify = new Ingredient(this.id, this.nom);
          this.ingredientService.putIngredient(ingredientModify).subscribe((updateIngredient) => {
            if(updateIngredient.id){
              this.navCtrl.pop();
            }
          }, (err) => {
            this.error = "une erreur est survenu lors de la modification de l'ingredient";
            console.log(err);
          })
          break;
      }
    }else {
      this.error = "Veuillez completer correctement les champs";
    }
  }

}
