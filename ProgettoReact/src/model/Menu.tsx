import { Language } from "./Language";
import { Restaurant } from "./Restaurant";
import { Section } from "./Section";

export interface CreateMenuCallBack {
    (menu: Menu): void;
}

export interface Menu{
    idMenu: number;
    title: string;
    restaurant: Restaurant;
    sections: Section[];
    mainLanguage: Language;
    languages: Language[];
}