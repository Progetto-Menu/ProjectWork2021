import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    idMenu: number;
    title: string;
    restaurant: Restaurant;
    languages: Language[];
}