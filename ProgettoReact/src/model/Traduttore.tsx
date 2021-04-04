import { Menu } from "./Menu";

export interface Traduttore{
    name: string;
    surname: string;
    email: string;
    nToken: number;
    takenTranslations: Menu[];
    reviewTranslations: Menu[];
}