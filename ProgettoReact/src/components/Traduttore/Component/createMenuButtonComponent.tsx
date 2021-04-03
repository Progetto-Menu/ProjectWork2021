import React, { Component, useState } from 'react';
import { CreateMenuCallBack, MenuProp, Restaurant, Section, Language } from '../Prop/menuProp';
import { NewSectionComponent } from "./newSectionComponent";

interface CreateMenuButtonProps{
    callback: CreateMenuCallBack
}
 
export const CreateMenuButtonComponent: React.FunctionComponent<CreateMenuButtonProps> = (props) => {

    let [idMenuValue, setIdMenuValue] = useState<number>(0);
    let [titleValue, setTitleValue] = useState<string>("");
    let [restaurantNameValue, setRestaurantNameValue] = useState<string>("");
    let [stateValue, setStateValue] = useState<string>("");
    let [cityValue, setCityValue] = useState<string>("");
    let [addressValue, setAddressValue] = useState<string>("");

    let [dishNameValue, setDishNameValue] = useState<string>("");
    let [sectiontValue, setSectionValue] = useState<Section[]>([]);
    let [mainLanguageValue, setMainLanguageValue] = useState<string>("");
    let [languagesValue, setLanguagesValue] = useState<Language[]>([]);


    return <React.Fragment>
        idMenu:
        <input type="number" value={idMenuValue} onChange={(event) => {
            let val = event.target.value;
            console.log(val);
            setIdMenuValue(parseInt(val));
        }} />
        Title:
        <input type="text" value={titleValue} onChange={(event) => {
            let val = event.target.value;
            console.log(val);
            setTitleValue(val);
        }} />
        Restaurant name:
        <input type="text" value={restaurantNameValue} onChange={(event) => {
            let val = event.target.value;
            console.log(val);
            setRestaurantNameValue(val);
        }} />
        Restaurant country:
        <input type="text" value={stateValue} onChange={(event) => {
            let val = event.target.value;
            console.log(val);
            setStateValue(val);
        }} />
        Restaurant city:
        <input type="text" value={cityValue} onChange={(event) => {
            let val = event.target.value;
            console.log(val);
            setCityValue(val);
        }} />
        Restaurant address:
        <input type="text" value={addressValue} onChange={(event) => {
            let val = event.target.value;
            console.log(val);
            setAddressValue(val);
        }} />
        <ul>
            <li>
                <NewSectionComponent />
                <ul>
                    <li>
                        Dish name:
                        <input type="text" value={dishNameValue} onChange={(event) => {
                            let val = event.target.value;
                            console.log(val);
                            setDishNameValue(val);
                        }} />
                    </li>
                </ul>
            </li>
        </ul>
        
        <button onClick={() => {
            let newMenu: MenuProp = {
                idMenu: idMenuValue,
                title: titleValue,
                restaurant: {
                    name: restaurantNameValue,
                    address: {
                        state: stateValue,
                        city: cityValue,
                        address: addressValue
                    }
                },
                sections: sectiontValue,
                mainLanguage: {
                    sign: mainLanguageValue
                },
                languages: languagesValue
            };
            props.callback(newMenu);
        }}>Crea</button>
    </React.Fragment>
}