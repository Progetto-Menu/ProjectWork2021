import React, { Component } from 'react';
import { MenuProp, Language } from "./Prop/menuProp";
import {VisualizzaPostMenu} from "./VisualizzaPostMenu";
export {Post_Traduttori};

const Post_Traduttori: React.FunctionComponent = () => {

    let l1: Language = {sign: "en-EN"}
    let l2: Language = {sign: "sp-SP"}
    let l3: Language = {sign: "fr-FR"}
    let l4: Language = {sign: "de-DE"}

    let menu1: MenuProp = {
        title: "Voglia di pizza",
        restaurant: {
            name: "Piziamo",
            address: {
                state: "Italy",
                city: "Cesena",
                address: "Via Aldo Moro, 23"
            }
        },
        languages: [l1, l3, l4]
    } 

    let menu2: MenuProp = {
        title: "Menù Carne",
        restaurant: {
            name: "Tramontana",
            address: {
                state: "Italy",
                city: "Bologna",
                address: "Via Unità, 142"
            }
        },
        languages: [l1, l2, l4]
    } 

    let menu3: MenuProp = {
        title: "Menù Primi",
        restaurant: {
            name: "Piziamo",
            address: {
                state: "Italy",
                city: "Modena",
                address: "Via Giovecca, 13"
            }
        },
        languages: [l1, l2]
    } 

    let menu4: MenuProp = {
        title: "Menù Pesci",
        restaurant: {
            name: "Sant Colombano",
            address: {
                state: "Italy",
                city: "Rovereto",
                address: "Via Vicenza, 30"
            }
        },
        languages: [l1, l3]
    } 

    let MenuArray : MenuProp[] = [menu1, menu2, menu3, menu4];

    return <>
   
   {MenuArray.map((item, index) => 
            <React.Fragment key={index}>
                <VisualizzaPostMenu title={item.title} restaurant={item.restaurant} languages={item.languages}/>
            </React.Fragment>
        )}

    </>
}