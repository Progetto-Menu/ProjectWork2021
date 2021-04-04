import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "../../../model/Menu";

export const MenuToReviewHomeComponent: React.FunctionComponent<Menu> = (prop) => {
    return <div className="bg-white w-50 mx-auto rounded border border-secondary">
        {prop.restaurant.name} 
        {prop.title}
     </div>
}