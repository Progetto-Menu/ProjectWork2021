import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { RoutesRistoratore } from "../../routes/Ristoratore";
import { AuthUtils } from "../../utils/AuthUtils";
import { JSONUtils } from "../../utils/JSONUtils";
import { StorageUtils } from "../../utils/StorageUtils";
import { Users } from "../../utils/Users";
import { AppRequest } from "../App";

export const HomeRistoratore: React.FunctionComponent = ()=>{

    const [request, setRequest] = useState<AppRequest>({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
    const history = useHistory();

    useEffect(() => {
        const checkToken = () => {
            setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
            AuthUtils.isLoggedIn(StorageUtils.get(StorageUtils.token_key), Users.RISTORATORE).then((result) => {
                let isUserValid = false;
                if (result != null) {
                    const tokenResult = JSONUtils.getProperty(result.data, "token", null);
                    isUserValid = JSONUtils.getProperty(result.data, "uservalid", false);
                    StorageUtils.set(StorageUtils.token_key, tokenResult);
                }
                else {
                    StorageUtils.set(StorageUtils.token_key, null);
                }
                setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: true, isUserValid: isUserValid });

            }).catch(() => {
                StorageUtils.set(StorageUtils.token_key, null)
                setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: true, isUserValid:false });
            })
        }
        if (history.location.pathname === RoutesRistoratore.HOME) checkToken();
    }, [history.location.pathname])


    if (request.isLoaded && request.token == null) {
        return <Redirect to={RoutesRistoratore.LOGIN} />
    }
    else if(request.isLoaded && request.token != null && request.isUserValid === false)
    {
        return <Redirect to={RoutesRistoratore.OTP} />
    }
    else if(!request.isLoaded){
        return <></>
    }

    return <></>
}