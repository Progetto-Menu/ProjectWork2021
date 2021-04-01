import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { RoutesRistoratore } from '../routes/Ristoratore';
import { RoutesTraduttore } from '../routes/Traduttore';
import { AuthUtils } from './AuthUtils';
import { JSONUtils } from './JSONUtils';
import { StorageUtils } from './StorageUtils';
import { Users } from './Users';

export type PrivateRouteProps = {
    user: Users;
} & RouteProps;


export const PrivateRoute = ({ user, ...routeProps }: PrivateRouteProps) => {
    const [tk, setTk] = useState<string | null>("");

    useEffect(() => {
        const isLoggedIn = async (user: Users) => {

            AuthUtils.isLoggedIn(StorageUtils.get(StorageUtils.token_key), user).then((result) => {
                if (result != null) {
                    const tokenResult = JSONUtils.getProperty(result.data, "token", null);
                    console.log(tokenResult);
                    setTk(tokenResult);
                }
                else {
                    setTk(null);
                }
            }).catch((error) => {
                setTk(null);
            })


        }
        if (tk === "") {
            isLoggedIn(user)
        }

    }, [tk, user])


    if (tk === "") {
        if (tk != null) {
            return <Route {...routeProps} />;
        } else {
            return <Redirect to={{ pathname: "/" }} />;
        }
    } else {
        return <></>
    }


};

export class RouterUtils {
    static getUserByRoute(url: string) {
        switch (url) {
            case RoutesTraduttore.HOME:
            case RoutesTraduttore.LOGIN:
            case RoutesTraduttore.REGISTER:
            case RoutesTraduttore.OTP:
                return Users.TRADUTTORE;
            case RoutesRistoratore.HOME:
            case RoutesRistoratore.LOGIN:
            case RoutesRistoratore.REGISTER:
            case RoutesRistoratore.OTP:
                return Users.RISTORATORE;
            default:
                return Users.NON_IMPOSTATO;
        }
    }
}