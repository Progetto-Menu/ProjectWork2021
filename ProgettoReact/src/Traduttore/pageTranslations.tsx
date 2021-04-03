import React, { Component, useState } from 'react';
import { MenuProp, Language, CreateMenuCallBack } from "./Prop/menuProp";
import { MenuToTranslateComponent } from "./Component/menuToTranslateComponent";
import { BottomNavBarComponent } from "./Component/bottomNavBarComponent";
import { bottomNavBar } from './Prop/bottomNavBarProp';
import {SearchBar} from "./Component/searchbar";
import { CreateMenuButtonComponent } from './Component/createMenuButtonComponent';


export const PageTranslations: React.FunctionComponent = () => {

    let l1: Language = {sign: "en-EN"}
    let l2: Language = {sign: "sp-SP"}
    let l3: Language = {sign: "fr-FR"}
    let l4: Language = {sign: "de-DE"}

    let menu1: MenuProp = {
        idMenu: 1,
        title: "Voglia di pizza",
        restaurant: {
            name: "Piziamo",
            address: {
                state: "Italy",
                city: "Cesena",
                address: "Via Aldo Moro, 23"
            }
        },
        sections:[],
        mainLanguage: {sign:"it-IT"},
        languages: [l1, l3, l4]
    } 

    let menu2: MenuProp = {
        idMenu: 2,
        title: "Menù Carne",
        restaurant: {
            name: "Tramontana",
            address: {
                state: "Italy",
                city: "Bologna",
                address: "Via Unità, 142"
            }
        },
        sections:[],
        mainLanguage: {sign:"it-IT"},
        languages: [l1, l2, l4]
    } 

    let menu3: MenuProp = {
        idMenu: 3,
        title: "Menù Primi",
        restaurant: {
            name: "Piziamo",
            address: {
                state: "Italy",
                city: "Modena",
                address: "Via Giovecca, 13"
            }
        },
        sections:[],
        mainLanguage: {sign:"it-IT"},
        languages: [l1, l2]
    } 

    let menu4: MenuProp = {
        idMenu: 4,
        title: "Menù Pesci",
        restaurant: {
            name: "Sant Colombano",
            address: {
                state: "Italy",
                city: "Rovereto",
                address: "Via Vicenza, 30"
            }
        },
        sections:[],
        mainLanguage: {sign:"it-IT"},
        languages: [l1, l3]
    } 

    let menu5: MenuProp = {
        idMenu: 5,
        title: "Menù Pesci",
        restaurant: {
            name: "Santo Domingo",
            address: {
                state: "Italy",
                city: "Urbino",
                address: "Via Marcello, 30"
            }
        },
        sections:[],
        mainLanguage: {sign:"it-IT"},
        languages: [l1, l3]
    } 

    let MenuArray : MenuProp[] = [menu1, menu2, menu3, menu4, menu5];

    let [menuArray, setMenuArray] = useState<MenuProp[]>([]);

    let callbackCreate : CreateMenuCallBack = (newMenu) => {
        let nuovalista = menuArray.concat(newMenu);
        console.log(menuArray);
        setMenuArray(nuovalista);
    }
    

    return <React.Fragment>
        <SearchBar/>
        <CreateMenuButtonComponent callback={callbackCreate} />
        {MenuArray.map((item, index) => 
            <React.Fragment key={index}>
                <MenuToTranslateComponent idMenu={item.idMenu} title={item.title} restaurant={item.restaurant} languages={item.languages} mainLanguage={item.mainLanguage} sections={item.sections}/>
            </React.Fragment>
        )}
        <BottomNavBarComponent type={bottomNavBar.translations} />
    </React.Fragment>   

}
