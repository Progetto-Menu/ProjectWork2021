import { Ristorante } from "../Ristorante";
import { Language } from "./Language";
import { Restaurant } from "./Restaurant";
import { Section } from "./Section";


export interface CustomMenu{
    id: number;
    title: string;
    subtitle: string;
    restaurant: Restaurant;
    sections: Section[];
    languages: Language[];
}