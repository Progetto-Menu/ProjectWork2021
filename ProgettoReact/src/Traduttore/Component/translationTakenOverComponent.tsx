import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserProp } from "../Prop/userProp"
import { MenuToTranslateHomeComponent } from "./menuToTranslateHomeComponent";


export const TranslationTakenOverComponent: React.FunctionComponent<UserProp> = (prop) => {
    return <div className="bg-white m-2 w-50 border border-secondary rounded text-dark text-center mx-auto ">
    Translation taken over
     {prop.takenTranslations.map((item, index) => 
              <React.Fragment key={index}>
                  <MenuToTranslateHomeComponent idMenu={item.idMenu} title={item.title} restaurant={item.restaurant} languages={item.languages}/>
              </React.Fragment>
          )}
  
      </div>
}