import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserProp } from "./Prop/userProp";
import { VisualizzaMenuHome } from "./visualizzaMenuHome";


export const YourTranslationToReview: React.FunctionComponent<UserProp> = (prop) => {
    return <div className="bg-white w-50 border border-secondary rounded text-dark text-center mx-auto ">
   Traduzioni prese in carico
    {prop.reviewTranslations.map((item, index) => 
             <React.Fragment key={index}>
                 <VisualizzaMenuHome idMenu={item.idMenu} title={item.title} restaurant={item.restaurant} languages={item.languages}/>
             </React.Fragment>
         )}
 
     </div>
}