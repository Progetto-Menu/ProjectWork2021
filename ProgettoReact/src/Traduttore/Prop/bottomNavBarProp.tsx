import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuProp } from "./menuProp";

export enum bottomNavBar{
    home,
    translations,
    profile
}

export interface bottomNavBarProp{
    type : bottomNavBar
}