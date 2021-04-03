import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuToReviewHomeComponent } from "./menuToReviewHomeComponent";
import { UserProp } from "../Prop/userProp";


export const YourTranslationToReviewComponent: React.FunctionComponent<UserProp> = (prop) => {
    return <div className="bg-white w-50 border border-secondary rounded text-dark text-center mx-auto ">
   Your translation to review
    {prop.reviewTranslations.map((item, index) => 
             <React.Fragment key={index}>
                 <MenuToReviewHomeComponent idMenu={item.idMenu} title={item.title} restaurant={item.restaurant} languages={item.languages} mainLanguage={item.mainLanguage} sections={item.sections}/>
             </React.Fragment>
         )}
 
     </div>
}