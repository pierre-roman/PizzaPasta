import iIngredient from "./i-ingredient";

export default class Ingredient implements iIngredient{
    id: number;
    nom: string;

    constructor(id: number, nom: string){
        this.id = id;
        this.nom = nom;
    }
}
