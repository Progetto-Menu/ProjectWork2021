import ReactDOM from "react-dom";
import React, { Component, useEffect, useState } from 'react';
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
import defaultProfile from "../../img/defaultProfile.jpg";
import { StorageUtils } from "../../utils/StorageUtils";
import axios from "axios";
import { JSONUtils } from "../../utils/JSONUtils";

export const PageProfile: React.FunctionComponent = () => {

    const [languages, setLanguages] = useState<Language[]>([]);
    const [myLaguages, setMyLanguages] = useState<Language[]>([]);
    const [user, setUser] = useState<UserProp>({
        email: "",
        name: "",
        surname: "",
        nToken: 0,
        reviewTranslations: [],
        takenTranslations: []
    });


    const history = useHistory();

    useEffect(() => {
        axios.post("https://api.progettomenu.cloud/traduttori/profile",
            {
                token: StorageUtils.get(StorageUtils.token_key)
            }).then((result) => {
                const nome: string = JSONUtils.getProperty(result.data, "nome", "");
                const cognome: string = JSONUtils.getProperty(result.data, "cognome", "");
                const email: string = JSONUtils.getProperty(result.data, "email", "");
                const n_token: string = JSONUtils.getProperty(result.data, "numero_token", "");
                console.log(result)
                const u: UserProp = {
                    email: email,
                    name: nome,
                    surname: cognome,
                    nToken: parseInt(n_token),
                    reviewTranslations: [],
                    takenTranslations: []
                }

                setUser(u)
            })

        axios.post("https://api.progettomenu.cloud/traduttori/profile/all-languages",
        {
            token: StorageUtils.get(StorageUtils.token_key)
        }).then((result)=>{
            const langs : Language[] = [];

            for(let x of result.data){
                langs.push({
                    id: JSONUtils.getProperty(x, "id", ""),
                    name: JSONUtils.getProperty(x, "nome", ""),
                    sign: JSONUtils.getProperty(x, "cod_lingua", "")
                })
            }


            setLanguages(langs);
            
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
    //     sections: [],
    //     mainLanguage: { sign: "it-IT" },
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
    //     sections: [],
    //     mainLanguage: { sign: "it-IT" },
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
    //     sections: [],
    //     mainLanguage: { sign: "it-IT" },
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
    //     sections: [],
    //     mainLanguage: { sign: "it-IT" },
    //     languages: [l1, l3]
    // }

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

            <div className="row mt-5">
                <div className="col-12">
                    <UserBarComponent user={user} />
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <MyTranslationsComponent name={user.name} surname={user.surname} email={user.email} nToken={user.nToken} takenTranslations={user.takenTranslations} reviewTranslations={user.reviewTranslations} />
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <YourLanguagesComponent allLanguages={languages} />
                </div>
            </div>

            <div className="row my-5">
                <div className="col-12 text-center">
                    <button className="btn btn-primary w-100" onClick={() => {
                        StorageUtils.remove(StorageUtils.token_key);
                        history.replace(RoutesTraduttore.LOGIN);
                    }}>Logout</button>
                </div>
            </div>

            <BottomNavBarComponent actions={bottombarprops.actions} />
        </div>
    </>
}