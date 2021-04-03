import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export interface CreateMenuCallBack {
    (menu: MenuProp): void;
}

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

export interface Dish{
    name: string;
    ingredients: string[];
    description: string;
}

export interface Section{
    name: string;
    dishes: Dish[];
}

export interface MenuProp{
    idMenu: number;
    title: string;
    restaurant: Restaurant;
    sections: Section[];
    mainLanguage: Language;
    languages: Language[];
}