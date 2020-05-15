import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Pizza from '../models/pizza';
import Ingredient from '../models/ingredient';
import { IngredientService } from '../services/ingredient.service';
import { PizzaService } from '../services/pizza.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-pizza-admin',
  templateUrl: './pizza-admin.page.html',
  styleUrls: ['./pizza-admin.page.scss'],
})
export class PizzaAdminPage implements OnInit {

  action: string;
  listeIngredients: Array<Ingredient>;
  error: string
  id: number;

  nom: string;
  photo: string;
  prix: number;
  ingredients: Array<number>;


  constructor(private camera: Camera, private router: Router, private route : ActivatedRoute, private ingredientService: IngredientService, private pizzaService: PizzaService) { }

  ngOnInit() {
    this.route.params
    .subscribe((pizza) => {
      this.ingredientService.getIngredient().subscribe(ingredients => this.listeIngredients = ingredients);
      if(Object.keys(pizza).length === 0){
        this.nom = "";
        this.photo = "";
        this.prix = -1;
        this.ingredients = [];
        this.action = "new";
      }else{
        this.pizzaService.getOnePizza(pizza.id).subscribe((myPizza) => {
          this.id = myPizza.id;
          this.nom = myPizza.nom;
          this.photo = myPizza.photo;
          this.prix = myPizza.prix;
          this.ingredients = myPizza.ingredients
        })
        this.action = "edit";
      }
    })
  }

  checkSelect(ingredientId) {
    
    if(this.ingredients.find((element) => {return element == ingredientId})){
      return true;
    }else {
      return false
    }
  }

  clickIngredient(ingredientId){
    var index = this.ingredients.findIndex((element) => { return element == ingredientId});
    if(index == -1){
      this.ingredients.push(ingredientId);
    }else {
      console.log(index);
      this.ingredients.splice(index, 1)
    }
  }

  sendPizza(){
    if(this.prix != -1 && this.nom.length > 0 && this.photo.length > 0 && this.ingredients.length > 0){
      console.log("send Pizza");
       
      switch (this.action) {
        case "new":
          this.pizzaService.postPizza(this.nom, this.photo, this.ingredients, this.prix).subscribe((newPizza) => {
            if(newPizza.id){
              this.id = newPizza.id;
              this.action = "edit";
              this.router.navigate(['admin']);
            }
          }, (err) => {
            this.error = err
            console.log(err);
          });
          break;
        case "edit":
          break;
      }
    }
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log('erreur');
      
    });
  }
}
