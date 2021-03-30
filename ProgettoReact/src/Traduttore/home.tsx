import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {BottomNavBar} from './BottomNavBar';
import { UserProp } from "./Prop/userProp";
import { WelcomeBack } from "./welcomeBack";
import { TranslationTakenOver } from "./translationTakenOver";
import { YourTranslationToReview } from "./YourTranslationToReview";
import { Language } from "./Prop/menuProp";
import { MenuProp } from "./Prop/menuProp";


export const Home: React.FunctionComponent<UserProp> = (prop) => {

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
        languages: [l1, l3]
    } 

    let user: UserProp = {
        name: "Andrea",
        surname: "Latino",
        takenTranslations: [menu1, menu2],
        reviewTranslations: [menu3, menu4]
    }

    return <>
        <WelcomeBack name={user.name} surname={user.surname} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
        <div className="bg-dark text-light" /**Questo è il container azzuro che racchiude TakenTranslation e TranslationToReview */>
            <TranslationTakenOver name={user.name} surname={user.surname} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
            <br></br>
            <YourTranslationToReview name={user.name} surname={user.surname} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
        </div>

        <BottomNavBar />
    </>
}