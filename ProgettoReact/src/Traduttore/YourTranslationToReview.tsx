import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserProp } from "./Prop/userProp";
import { VisualizzaMenuHome } from "./visualizzaMenuHome";


export const YourTranslationToReview: React.FunctionComponent<UserProp> = (prop) => {
    return <div className="bg-info w-50 text-center">
   Your Translation to review
    {prop.reviewTranslations.map((item, index) => 
             <React.Fragment key={index}>
                 <VisualizzaMenuHome idMenu={item.idMenu} title={item.title} restaurant={item.restaurant} languages={item.languages}/>
             </React.Fragment>
         )}
 
     </div>
}