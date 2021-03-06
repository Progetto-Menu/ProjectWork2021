import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomTraduzione } from "../../../model/CustomTraduzione";
import { Language } from "../../../model/Language";
import { Traduttore } from "../../../model/Traduttore";
import { RoutesTraduttore } from "../../../routes/Traduttore";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { StorageUtils } from "../../../utils/StorageUtils";
import { strings } from "../../../utils/Strings";
import { Users } from "../../../utils/Users";
import { MyTranslationsComponent } from "./myTranslationsComponent";
import { UserBarComponent } from "./userBarComponent";
import { YourLanguagesComponent } from "./yourLanguagesComponent";

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
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult !== "error") {
                for (let x of ajaxResult) {
                    langs.push({
                        id: JSONUtils.getProperty(x, "id", ""),
                        name: JSONUtils.getProperty(x, "nome", ""),
                        sign: JSONUtils.getProperty(x, "cod_lingua", "")
                    })
                }


                setUnknownLanguages(langs);
            }
        })
    }

    const getAllLanguagesKnown = () => {
        AjaxUtils.getAllLanguagesKnown().then((result) => {
            const langs: Language[] = [];
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult !== "error") {

                for (let x of ajaxResult) {
                    langs.push({
                        id: JSONUtils.getProperty(x, "id", ""),
                        name: JSONUtils.getProperty(x, "nome", ""),
                        sign: JSONUtils.getProperty(x, "cod_lingua", "")
                    })
                }


                setKnownLanguages(langs);
            }

        })
    }

    const getUser = () => {
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

    const getAllTranslations = () => {
        AjaxUtils.getAllTranslations().then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if(ajaxResult !== "error"){
                setTranslations(ajaxResult);
            }
        }).catch((error) => {

        })
    }

    const refreshLanguages = () => {
        getAllLanguagesKnown();
        getAllLanguagesUnknown();
    }

    const logout = () => {
        StorageUtils.remove(StorageUtils.token_key);
        history.replace(RoutesTraduttore.LOGIN);
    }



    useEffect(() => {
        getUser();
        getAllTranslations();
        getAllLanguagesUnknown();
        getAllLanguagesKnown();

    }, [])


    return <>
        <div className="row">
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
                <YourLanguagesComponent unKnownLanguages={unKnownLanguages} knownLanguages={knownLanguages} onClickAdd={refreshLanguages} onClickRemove={refreshLanguages} />
            </div>
        </div>

        <div className="row my-5">
            <div className="col-12 text-center">
                <button className="btn btn-primary w-100" onClick={logout}>{strings.logout}</button>
            </div>
        </div>
    </>
}