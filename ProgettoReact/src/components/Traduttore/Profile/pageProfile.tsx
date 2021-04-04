import ReactDOM from "react-dom";
import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../img/logo_menu.png';
import { UserBarComponent } from "./userBarComponent";
import { MyTranslationsComponent } from "./myTranslationsComponent";
import { YourLanguagesComponent } from "./yourLanguagesComponent";
import { BottomNavBarComponent, BottomNavBarProps } from "../../shared/BottomNavBarComponent";
import { RoutesTraduttore } from "../../../routes/Traduttore";
import { TopBar } from "../../shared/TopBar";
import defaultProfile from "../../img/defaultProfile.jpg";
import { StorageUtils } from "../../../utils/StorageUtils";
import axios from "axios";
import { JSONUtils } from "../../../utils/JSONUtils";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { Users } from "../../../utils/Users";
import { Language } from "../../../model/Language";
import { Traduttore } from "../../../model/Traduttore";

export const PageProfile: React.FunctionComponent = () => {

    const [unKnownLanguages, setUnknownLanguages] = useState<Language[]>([]);
    const [knownLanguages, setKnownLanguages] = useState<Language[]>([]);
    const [user, setUser] = useState<Traduttore>({
        email: "",
        name: "",
        surname: "",
        nToken: 0,
        reviewTranslations: [],
        takenTranslations: []
    });


    const history = useHistory();

    const getAllLanguagesUnknown = ()=>{
        AjaxUtils.getAllLanguagesUnknown().then((result)=>{
            const langs : Language[] = [];

            for(let x of result.data){
                langs.push({
                    id: JSONUtils.getProperty(x, "id", ""),
                    name: JSONUtils.getProperty(x, "nome", ""),
                    sign: JSONUtils.getProperty(x, "cod_lingua", "")
                })
            }


            setUnknownLanguages(langs);
            
        })
    }

    const getAllLanguagesKnown = ()=>{
        AjaxUtils.getAllLanguagesKnown().then((result)=>{
            const langs : Language[] = [];

            for(let x of result.data){
                langs.push({
                    id: JSONUtils.getProperty(x, "id", ""),
                    name: JSONUtils.getProperty(x, "nome", ""),
                    sign: JSONUtils.getProperty(x, "cod_lingua", "")
                })
            }


            setKnownLanguages(langs);
            
        })
    }

    useEffect(() => {
        AjaxUtils.getUser(Users.TRADUTTORE).then((result) => {
                const nome: string = JSONUtils.getProperty(result.data, "nome", "");
                const cognome: string = JSONUtils.getProperty(result.data, "cognome", "");
                const email: string = JSONUtils.getProperty(result.data, "email", "");
                const n_token: string = JSONUtils.getProperty(result.data, "numero_token", "");
                const u: Traduttore = {
                    email: email,
                    name: nome,
                    surname: cognome,
                    nToken: parseInt(n_token),
                    reviewTranslations: [],
                    takenTranslations: []
                }

                setUser(u)
            })

        
            getAllLanguagesUnknown();
            getAllLanguagesKnown();
        
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
                    <YourLanguagesComponent unKnownLanguages={unKnownLanguages} knownLanguages={knownLanguages} onClickAdd={()=>{
                        getAllLanguagesKnown();
                        getAllLanguagesUnknown();
                    }} onClickRemove={()=>{
                        getAllLanguagesKnown();
                        getAllLanguagesUnknown();
                    }}/>
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