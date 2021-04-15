import { Language } from "./Language";
import { Restaurant } from "./Restaurant";
import { Section } from "./Section";

export interface CreateMenuCallBack {
    (menu: Menu): void;
}

export interface Menu{
    id: number;
    title: string;
    subtitle: string;
    restaurant: Restaurant;
    sections: Section[];
    languages: Language[];
}