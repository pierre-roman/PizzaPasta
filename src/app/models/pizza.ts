import iPizza from "./i-pizza";

export default class Pizza implements iPizza{
    id: number;
    nom: string;
    photo: string;
    prix: number;
    ingredients: Array<number>;

    constructor(id: number, nom: string, photo: string, prix: number, ingredients: Array<number>){
        this.id = id;
        this.nom = nom;
        this.photo = photo;
        this.prix = prix; 
        this.ingredients = ingredients;
    }
}
