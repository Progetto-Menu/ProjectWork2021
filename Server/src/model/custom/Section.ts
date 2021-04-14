import { Dish } from "./Dish";

export interface Section{
    id: number
    name: string;
    subtitle: string;
    dishes: Dish[];
}