import { Menu } from "./Menu";

export interface Traduttore{
    id?: number
    name: string;
    surname: string;
    email: string;
    nToken: number;
    takenTranslations: Menu[];
    reviewTranslations: Menu[];
}