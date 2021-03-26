export interface Address{
    state: string;
    city: string;
    address: string;
}

export interface Restaurant{
    name: string;
    address: Address;
}

export interface Language{
    sign: string;
}

export interface MenuProp{
    title: string;
    restaurant: Restaurant;
    languages: Language[];
}