import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../img/logo_menu.png';
import { UserProp } from "./Prop/userProp";
import { MenuProp, Language } from "./Prop/menuProp";
import { UserBarComponent } from "./Component/userBarComponent";
import { MyTranslationsComponent } from "./Component/myTranslationsComponent";
import { YourLanguagesComponent } from "./Component/yourLanguagesComponent";
import { ChangePersonalDataComponent } from "./Component/changePersonalDataComponent";
import { BottomNavBarComponent, BottomNavBarProps } from "../shared/BottomNavBarComponent";
import { bottomNavBar } from "./Prop/bottomNavBarProp";
import { RoutesTraduttore } from "../../routes/Traduttore";
import { TopBar } from "../shared/TopBar";

export const PageProfile: React.FunctionComponent = () => {

    let l1: Language = { sign: "en-EN" }
    let l2: Language = { sign: "sp-SP" }
    let l3: Language = { sign: "fr-FR" }
    let l4: Language = { sign: "de-DE" }

    const history = useHistory();

    let menu1: MenuProp = {
        idMenu: 1,
        title: "Voglia di pizza ",
        restaurant: {
            name: "Piziamo ",
            address: {
                state: "Italy ",
                city: "Cesena ",
                address: "Via Aldo Moro, 23 "
            }
        },
        sections: [],
        mainLanguage: { sign: "it-IT" },
        languages: [l1, l3, l4]
    }

    let menu2: MenuProp = {
        idMenu: 2,
        title: "Menù Carne ",
        restaurant: {
            name: "Tramontana ",
            address: {
                state: "Italy ",
                city: "Bologna ",
                address: "Via Unità, 142 "
            }
        },
        sections: [],
        mainLanguage: { sign: "it-IT" },
        languages: [l1, l2, l4]
    }

    let menu3: MenuProp = {
        idMenu: 3,
        title: "Menù Primi ",
        restaurant: {
            name: "Piziamo ",
            address: {
                state: "Italy ",
                city: "Modena ",
                address: "Via Giovecca, 13 "
            }
        },
        sections: [],
        mainLanguage: { sign: "it-IT" },
        languages: [l1, l2]
    }

    let menu4: MenuProp = {
        idMenu: 4,
        title: "Menù Pesci",
        restaurant: {
            name: "Sant Colombano ",
            address: {
                state: "Italy",
                city: "Rovereto",
                address: "Via Vicenza, 30"
            }
        },
        sections: [],
        mainLanguage: { sign: "it-IT" },
        languages: [l1, l3]
    }

    let user: UserProp = {
        name: "Andrea ",
        surname: "Latino ",
        nToken: 20,
        takenTranslations: [menu1, menu2],
        reviewTranslations: [menu3, menu4]
    }

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: "Home",
                selected: false,
                onClick: () => {
                    history.replace(RoutesTraduttore.HOME);
                }
            }, {
                label: "Translations",
                selected: false,
                onClick: () => {
                    history.replace(RoutesTraduttore.TRANSLATIONS);
                }
            }, {
                label: "Profile",
                selected: true,
                onClick: () => {
                    history.replace(RoutesTraduttore.PROFILE);
                }
            },
        ]
    }

    return <>
        <TopBar text="Profile" />
        <div className="container py-5">

            <div className="bg-info m-5 text-light text-center" /**Questo è il container azzuro che racchiude TakenTranslation e TranslationToReview */>
                <UserBarComponent name={user.name} surname={user.surname} nToken={user.nToken} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
                <MyTranslationsComponent name={user.name} surname={user.surname} nToken={user.nToken} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
                <YourLanguagesComponent name={user.name} surname={user.surname} nToken={user.nToken} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
                <ChangePersonalDataComponent name={user.name} surname={user.surname} nToken={user.nToken} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
                <button className="btn btn-primary">Logout</button>
            </div>
            <BottomNavBarComponent actions={bottombarprops.actions} />
        </div>
    </>
}