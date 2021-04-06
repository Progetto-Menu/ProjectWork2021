import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuProp } from "../Prop/menuProp";

export const MenuToTranslateHomeComponent: React.FunctionComponent<MenuProp> = (prop) => {
    return <div>
        <button className="bg-white w-50 mx-auto rounded border border-secondary">
        {prop.restaurant.name} 
        {prop.title}        
     </button>
     </div>
}