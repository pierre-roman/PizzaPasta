import { Injectable } from '@angular/core';
import Ingredient from '../models/ingredient';
import IIngredient from '../models/i-ingredient';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  getIngredient(): Observable<Ingredient[]> {
    return this.http.get<IIngredient[]>('https://api.ynov.jcatania.io/ingredient')
        .pipe(
            map(value => {
              if (value.length > 0) {
                return value;
              } else {
                throw new Error ('Aucun ingredient trouvé');
              }
            }),
            map(value => {
              var newArray = Array<Ingredient>();
              value.forEach((value, i) => {
                newArray[i] = new Ingredient(value.id, value.nom);
              })
              return newArray;
            })
        );
  }

  getOneIngredient(ingredientId): Observable<Ingredient> {
    return this.http.get<IIngredient>('https://api.ynov.jcatania.io/ingredient/' + ingredientId)
        .pipe(
            map(value => {
              if (value) {
                return value;
              } else {
                throw new Error ('Aucun ingredient trouvé');
              }
            }),
            map(value => new Ingredient(value.id, value.nom))
        );
  }

  putIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<IIngredient>('https://api.ynov.jcatania.io/ingredient/' + ingredient.id, ingredient)
        .pipe(
            map(value => {
              
              if (value) {
                return value;
              } else {
                throw new Error ('Aucun ingredient trouvé');
              }
            }),
            map(value => new Ingredient(value.id, value.nom))
        );
  }

  postIngredient(nom: string): Observable<Ingredient> {
    var ingredient = {nom: nom}
    return this.http.post<IIngredient>('https://api.ynov.jcatania.io/ingredient', ingredient)
        .pipe(
            map(value => {
              
              if (value) {
                return value;
              } else {
                throw new Error ('Aucun ingredient trouvé');
              }
            }),
            map(value => new Ingredient(value.id, value.nom))
        );
  }

  deleteIngredient(id : number) {
    return this.http.delete('https://api.ynov.jcatania.io/ingredient/' + id)
  }
}
