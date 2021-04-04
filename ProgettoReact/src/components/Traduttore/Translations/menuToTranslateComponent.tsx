import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LanguageService, LanguageServiceMode } from "typescript";
import { Menu } from "../../../model/Menu";


export const MenuToTranslateComponent: React.FunctionComponent<Menu> = (prop) => {
   
    return <React.Fragment>
        <div className=" py-3 my-1 text-center col-6 bg-secondary w-25 mx-auto rounded border-secondary text-dark">       
                {prop.title} <br></br>
                {prop.restaurant.address.state}<br></br>
                {prop.restaurant.address.city}<br></br>
                {prop.restaurant.address.address}<br></br>
                {prop.languages.map((item, index) =>
                    <React.Fragment key={index}>
                        {item.sign}<br></br>
                    </React.Fragment>
                )}     
        </div>   
    </React.Fragment>    
}
