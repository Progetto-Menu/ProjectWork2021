import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuProp } from "./Prop/menuProp";

export const VisualizzaMenuHome: React.FunctionComponent<MenuProp> = (prop) => {
    return <div className="bg-warning w-25 border border-dark">
        {prop.restaurant.name} 
        {prop.title}
     </div>
}