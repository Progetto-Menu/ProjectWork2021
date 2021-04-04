import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { AjaxUtils } from '../../utils/AjaxUtils';
import { JSONUtils } from '../../utils/JSONUtils';
import { StorageUtils } from '../../utils/StorageUtils';
import { Users } from '../../utils/Users';
import { AppRequest } from '../App';
import { TopBar } from '../shared/TopBar';
import { TranslationTakenOverComponent } from './Component/translationTakenOverComponent';
import { WelcomeBackComponent } from './Component/welcomeBackComponent';
import { YourTranslationToReviewComponent } from './Component/yourTranslationToReviewComponent';
import { Language, MenuProp } from './Prop/menuProp';
import { UserProp } from './Prop/userProp';
import { BottomNavBarComponent, BottomNavBarProps } from "../shared/BottomNavBarComponent"
 

export const HomeTraduttore: React.FunctionComponent = () => {

    // let l1: Language = {sign: "en-EN"}
    // let l2: Language = {sign: "sp-SP"}
    // let l3: Language = {sign: "fr-FR"}
    // let l4: Language = {sign: "de-DE"}

    const [topBarText, setTopBarText] = useState<string>("Bentornato");
    const history = useHistory();

    useEffect(()=>{
        AjaxUtils.getUser(Users.TRADUTTORE).then((result)=>{
            const nome: string = JSONUtils.getProperty(result.data, "nome", "");
            const cognome: string = JSONUtils.getProperty(result.data, "cognome", "");

            setTopBarText("Bentornato " + nome + " " + cognome)
        })
    }, [])

    // let menu1: MenuProp = {
    //     idMenu: 1,
    //     title: "Voglia di pizza ",
    //     restaurant: {
    //         name: "Piziamo ",
    //         address: {
    //             state: "Italy ",
    //             city: "Cesena ",
    //             address: "Via Aldo Moro, 23 "
    //         }
    //     },
    //     sections:[],
    //     mainLanguage: {sign: "it-IT"},
    //     languages: [l1, l3, l4]
    // } 

    // let menu2: MenuProp = {
    //     idMenu: 2,
    //     title: "Menù Carne ",
    //     restaurant: {
    //         name: "Tramontana ",
    //         address: {
    //             state: "Italy ",
    //             city: "Bologna ",
    //             address: "Via Unità, 142 "
    //         }
    //     },
    //     sections:[],
    //     mainLanguage: {sign: "it-IT"},
    //     languages: [l1, l2, l4]
    // } 

    // let menu3: MenuProp = {
    //     idMenu: 3,
    //     title: "Menù Primi ",
    //     restaurant: {
    //         name: "Piziamo ",
    //         address: {
    //             state: "Italy ",
    //             city: "Modena ",
    //             address: "Via Giovecca, 13 "
    //         }
    //     },
    //     sections:[],
    //     mainLanguage: {sign: "it-IT"},
    //     languages: [l1, l2]
    // } 

    // let menu4: MenuProp = {
    //     idMenu: 4,
    //     title: "Menù Pesci",
    //     restaurant: {
    //         name: "Sant Colombano ",
    //         address: {
    //             state: "Italy",
    //             city: "Rovereto",
    //             address: "Via Vicenza, 30"
    //         }
    //     },
    //     sections:[],
    //     mainLanguage: {sign: "it-IT"},
    //     languages: [l1, l3]
    // } 

    let user: UserProp = {
        name: "Andrea ",
        surname: "Latino ",
        nToken: 20,
        email: "prova@gmail.com",
        takenTranslations: [],
        reviewTranslations: []
    }

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: "Home",
                selected: true,
                onClick: ()=>{
                    history.replace(RoutesTraduttore.HOME);
                }
            }, {
                label: "Translations",
                selected: false,
                onClick: ()=>{
                    history.replace(RoutesTraduttore.TRANSLATIONS);
                }
            }, {
                label: "Profile",
                selected: false,
                onClick: ()=>{
                    history.replace(RoutesTraduttore.PROFILE);
                }
            },
        ]
    }

    return <>
    <TopBar text={topBarText} />
    <div className="container py-5">
        
        <div className="bg-info m-5 text-light" /**Questo è il container azzuro che racchiude TakenTranslation e TranslationToReview */>
            <TranslationTakenOverComponent name={user.name} surname={user.surname} nToken={user.nToken} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} email={user.email}/>
            <br></br>
            <YourTranslationToReviewComponent name={user.name} surname={user.surname} nToken={user.nToken} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} email={user.email} />
        </div>
        <BottomNavBarComponent actions={bottombarprops.actions} />
    </div></>
}