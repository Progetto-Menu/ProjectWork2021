import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router';
import { AppRequest } from '../components/App';
import { RoutesRistoratore } from '../routes/Ristoratore';
import { RoutesTraduttore } from '../routes/Traduttore';
import { AjaxUtils } from './AjaxUtils';
import { JSONUtils } from './JSONUtils';
import { StorageUtils } from './StorageUtils';
import { Users } from './Users';

export type PrivateRouteProps = {
} & RouteProps;


export const PrivateRoute = ({ ...routeProps }: PrivateRouteProps) => {
    const [request, setRequest] = useState<AppRequest>({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
    const history = useHistory();

    useEffect(() => {
        const checkToken = () => {
            setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
            AjaxUtils.isLoggedIn(RouterUtils.getUserByRoute(history.location.pathname)).then((result) => {
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
                setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: true, isUserValid: false });
            })
        }
        checkToken();

    }, [history.location.pathname])

    if (request.isLoaded && request.token == null) {
        const user: Users = RouterUtils.getUserByRoute(history.location.pathname)
        if (user === Users.TRADUTTORE) {
            return <Redirect to={RoutesTraduttore.LOGIN} />
        }
        else {
            return <Redirect to={RoutesRistoratore.LOGIN} />
        }
    }
    else if (request.isLoaded && request.token != null && request.isUserValid === false) {
        const user: Users = RouterUtils.getUserByRoute(history.location.pathname)
        if (user === Users.TRADUTTORE) {
            return <Redirect to={RoutesTraduttore.OTP} />
        }
        else {
            return <Redirect to={RoutesRistoratore.OTP} />
        }

    }
    else if (request.isLoaded && request.token != null && request.isUserValid === true) {
        return <Route {...routeProps} />;
    }
    else {
        return <Route {...routeProps} />;
    }



};

export class RouterUtils {

    static getUserByRoute(url: string) {
        switch (url) {
            case RoutesTraduttore.HOME:
            case RoutesTraduttore.LOGIN:
            case RoutesTraduttore.REGISTER:
            case RoutesTraduttore.OTP:
            case RoutesTraduttore.PROFILE:
            case RoutesTraduttore.TRANSLATIONS:
                return Users.TRADUTTORE;
            case RoutesRistoratore.HOME:
            case RoutesRistoratore.LOGIN:
            case RoutesRistoratore.REGISTER:
            case RoutesRistoratore.OTP:
            case RoutesRistoratore.PROFILE:
            case RoutesRistoratore.MENUS:
                return Users.RISTORATORE;
            default:
                return Users.NON_IMPOSTATO;
        }
    }
}