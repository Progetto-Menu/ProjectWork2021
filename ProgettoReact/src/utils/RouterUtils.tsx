import { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { AuthUtils } from './AuthUtils';
import { JSONUtils } from './JSONUtils';
import { TokenUtils } from './TokenUtils';
import { Users } from './Users';

export type PrivateRouteProps = {
    user: Users;
} & RouteProps;


export const PrivateRoute = ({ user, ...routeProps }: PrivateRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoaded, setIsloaded] = useState<boolean>(false);

    useEffect(() => {
        const isLoggedIn = async (token: string | null, user: Users) => {
            const result = await AuthUtils.isLoggedIn(token, user);
            if (result != null) {
                const tokenResult = JSONUtils.getProperty(result.data, "token", null);
                setIsAuthenticated(tokenResult != null);
            }
            setIsloaded(true);

        }

        isLoggedIn(TokenUtils.getToken(), user)
    })

    if (isLoaded) {
        if (isAuthenticated) {
            return <Route {...routeProps} />;
        } else {
            return <Redirect to={{ pathname: "/" }} />;
        }
    } else {
        return <></>
    }


};