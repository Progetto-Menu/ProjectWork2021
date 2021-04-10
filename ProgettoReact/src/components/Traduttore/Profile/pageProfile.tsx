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
import { CustomTraduzione } from "../../../model/CustomTraduzione";

export const PageProfile: React.FunctionComponent = () => {

    const [unKnownLanguages, setUnknownLanguages] = useState<Language[]>([]);
    const [knownLanguages, setKnownLanguages] = useState<Language[]>([]);
    const [translations, setTranslations] = useState<CustomTraduzione[]>([]);

    const [user, setUser] = useState<Traduttore>({
        email: "",
        name: "",
        surname: "",
        nToken: 0,
        reviewTranslations: [],
        takenTranslations: []
    });


    const history = useHistory();

    const getAllLanguagesUnknown = () => {
        AjaxUtils.getAllLanguagesUnknown().then((result) => {
            const langs: Language[] = [];

            for (let x of result.data) {
                langs.push({
                    id: JSONUtils.getProperty(x, "id", ""),
                    name: JSONUtils.getProperty(x, "nome", ""),
                    sign: JSONUtils.getProperty(x, "cod_lingua", "")
                })
            }


            setUnknownLanguages(langs);

        })
    }

    const getAllLanguagesKnown = () => {
        AjaxUtils.getAllLanguagesKnown().then((result) => {
            const langs: Language[] = [];

            for (let x of result.data) {
                langs.push({
                    id: JSONUtils.getProperty(x, "id", ""),
                    name: JSONUtils.getProperty(x, "nome", ""),
                    sign: JSONUtils.getProperty(x, "cod_lingua", "")
                })
            }


            setKnownLanguages(langs);

        })
    }

    const getUser = () =>{
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
    }

    const getAllTranslations = ()=>{
        AjaxUtils.getAllTranslations().then((result) => {
            setTranslations(result.data);
        }).catch((error) => {

        })
    }



    useEffect(() => {
        getUser();
        getAllTranslations();
        getAllLanguagesUnknown();
        getAllLanguagesKnown();

    }, [])


    return <>
        <div className="row mt-5">
            <div className="col-12">
                <UserBarComponent user={user} />
            </div>
        </div>

        <div className="row mt-5">
            <div className="col-12">
                <MyTranslationsComponent translations={translations} />
            </div>
        </div>

        <div className="row mt-5">
            <div className="col-12">
                <YourLanguagesComponent unKnownLanguages={unKnownLanguages} knownLanguages={knownLanguages} onClickAdd={() => {
                    getAllLanguagesKnown();
                    getAllLanguagesUnknown();
                }} onClickRemove={() => {
                    getAllLanguagesKnown();
                    getAllLanguagesUnknown();
                }} />
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
    </>
}