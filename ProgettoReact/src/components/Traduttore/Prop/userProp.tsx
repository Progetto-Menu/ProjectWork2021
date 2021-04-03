import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuProp } from "./menuProp";

export interface UserProp{
    name: string;
    surname: string;
    email: string;
    nToken: number;
    takenTranslations: MenuProp[];
    reviewTranslations: MenuProp[];
}