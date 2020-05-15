import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Pizza from '../models/pizza';
import Ingredient from '../models/ingredient';
import { IngredientService } from '../services/ingredient.service';
import { PizzaService } from '../services/pizza.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subscription } from 'rxjs';

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

  subscribeIngredient: Subscription;


  constructor(private camera: Camera, private router: Router, private route : ActivatedRoute, private ingredientService: IngredientService, private pizzaService: PizzaService) { }

  ngOnInit() {
    this.route.params
    .subscribe((pizza) => {
      this.subscribeIngredient = this.ingredientService.getIngredient().subscribe(ingredients => this.listeIngredients = ingredients);
      if(Object.keys(pizza).length === 0){
        this.nom = "";
        this.photo = "";
        this.ingredients = [];
        this.action = "new";
      }else{
        this.id = pizza.id;
        
        this.nom = "";
        this.photo = "";
        this.ingredients = []
        this.pizzaService.getOnePizza(pizza.id).subscribe((myPizza) => {
          console.log("myPizza", myPizza);
          this.nom = myPizza.nom;
          this.photo = myPizza.photo;
          this.prix = myPizza.prix;
          this.ingredients = myPizza.ingredients
        })
        this.action = "edit";
      }
    })
  }

  ionViewWillEnter(){
    this.subscribeIngredient.unsubscribe();
    this.subscribeIngredient = this.ingredientService.getIngredient().subscribe(ingredients => this.listeIngredients = ingredients);
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
      this.ingredients.splice(index, 1)
    }
  }

  sendPizza(){
    if(this.prix >= 0 && this.nom.length > 0 && this.photo.length > 0 && this.ingredients.length > 0){
      
      switch (this.action) {
        case "new":
          this.pizzaService.postPizza(this.nom, this.photo, this.ingredients, this.prix).subscribe((newPizza) => {
            if(newPizza.id){
              this.id = newPizza.id;
              this.action = "edit";
              this.router.navigate(['admin']);
            }
          }, (err) => {
            this.error = "une erreur est survenu lors de l'ajout de la pizza";
            console.log(err);
          });
          break;
        case "edit":
          var pizzaModify = new Pizza(this.id, this.nom, this.photo, this.prix, this.ingredients);
          this.pizzaService.putPizza(pizzaModify).subscribe((updatePizza) => {
            if(updatePizza.id){
              this.router.navigate(['admin']);
            }
          }, (err) => {
            this.error = "une erreur est survenu lors de la modification de la pizza";
            console.log(err);
          })
          break;
      }
    }else {
      this.error = "Veuillez completer correctement les champs";
    }
  }

  deletePizza(){
    if(this.action == "edit" && this.id){
      this.pizzaService.deletePizza(this.id).subscribe(() => {
        this.router.navigate(['admin']);
      })
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
