import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Pizza from '../models/pizza';
import iPizza from '../models/i-pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }

  getPizza(): Observable<Pizza[]> {
    return this.http.get<iPizza[]>('https://api.ynov.jcatania.io/pizza')
        .pipe(
            map(value => {
              if (value.length > 0) {
                return value;
              } else {
                throw new Error ('Aucune pizza trouvé');
              }
            }),
            map(value => {
              var newArray = Array<Pizza>();
              value.forEach((value, i) => {
                newArray[i] = new Pizza(value.id, value.nom, value.photo, value.prix, value.ingredients);
              })
              return newArray;
            })
        );
  }

  getOnePizza(idPizza : number): Observable<Pizza>{
    return this.http.get<iPizza>('https://api.ynov.jcatania.io/pizza/' + idPizza)
        .pipe(
            map(value => {
              
              if (value) {
                return value;
              } else {
                throw new Error ('Aucune pizza trouvé');
              }
            }),
            map(value => new Pizza(value.id, value.nom, value.photo, value.prix, value.ingredients))
        );
  }

  putPizza(pizza: Pizza): Observable<Pizza> {
    return this.http.put<iPizza>('https://api.ynov.jcatania.io/pizza/' + pizza.id, pizza)
        .pipe(
            map(value => {
              
              if (value) {
                return value;
              } else {
                throw new Error ('Aucune pizza trouvé');
              }
            }),
            map(value => new Pizza(value.id, value.nom, value.photo, value.prix, value.ingredients))
        );
  }

  postPizza(nom: string, photo: string, ingredients: Array<Number>, prix: Number): Observable<Pizza> {
    var pizza = {nom: nom, photo: photo, ingredients: ingredients, prix: prix}
    return this.http.post<iPizza>('https://api.ynov.jcatania.io/pizza', pizza)
        .pipe(
            map(value => {
              
              if (value) {
                return value;
              } else {
                throw new Error ('la pizza n\'a pas pu être créé');
              }
            }),
            map(value => new Pizza(value.id, value.nom, value.photo, value.prix, value.ingredients))
        );
  }

  deletePizza(id : number) {
    return this.http.delete('https://api.ynov.jcatania.io/pizza/' + id)
  }

}
