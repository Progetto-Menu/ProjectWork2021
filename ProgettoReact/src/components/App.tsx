import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { RoutesUtente } from '../routes/Cliente';
import { RoutesRistoratore } from '../routes/Ristoratore';
import { RoutesTraduttore } from '../routes/Traduttore';
import { PrivateRoute } from '../utils/RouterUtils';
import { StorageUtils } from '../utils/StorageUtils';
import { Users } from '../utils/Users';
import { LoginComponent } from './Login/LoginComponent';
import { OTPComponent } from './Login/OTPComponent';
import { RegisterComponent } from './Login/RegisterComponent';
import { SwitchLoginComponent } from './Login/SwitchLoginComponent';
import { BaseRistoratore } from './Ristoratore/BaseRistoratore';
import { BaseTraduttore } from './Traduttore/Base/BaseTraduttore';
import { HomeUtente } from './Utente/HomeUtente';

export interface AppRequest {
    token: string | null,
    isLoaded: boolean,
    isUserValid?: boolean,
    email?: string | null
}
export const App: React.FunctionComponent = () => {
    const [user, setUser] = useState<Users>(Users.NON_IMPOSTATO);
    const history = useHistory();

    useEffect(() => {
        try {
            const userType = parseInt(StorageUtils.get(StorageUtils.user_type) ?? Users.NON_IMPOSTATO.toString());
            if (userType >= 0 && userType <= 4) setUser(userType);
            else setUser(Users.NON_IMPOSTATO);
        } catch {
            setUser(Users.NON_IMPOSTATO);
        }

    }, [history.location.pathname])

    if (user === Users.NON_IMPOSTATO) {
        return <Switch>
            <Route path="/" exact>
                <SwitchLoginComponent selectedUserCallback={(u) => {
                    StorageUtils.set(StorageUtils.user_type, u.toString());
                    setUser(u);
                }} />
            </Route>
        </Switch>
    }
    else if (user === Users.TRADUTTORE) {
        return <Switch>
            <Route path="/" exact>
                <Redirect to={RoutesTraduttore.LOGIN} />
            </Route>
            <Route path={RoutesTraduttore.LOGIN} exact>
                <LoginComponent user={user} onClickBack={() => {
                    StorageUtils.remove(StorageUtils.user_type);
                    setUser(Users.NON_IMPOSTATO)
                    history.replace("/")
                }} />
            </Route>
            <Route path={RoutesTraduttore.REGISTER} exact>
                <RegisterComponent user={user} />
            </Route>
            <Route path={RoutesTraduttore.OTP} exact>
                <OTPComponent user={user} />
            </Route>
            <PrivateRoute path={RoutesTraduttore.HOME} exact>
                <BaseTraduttore route={RoutesTraduttore.HOME} />
            </PrivateRoute>
            <PrivateRoute path={RoutesTraduttore.TRANSLATIONS} exact>
                <BaseTraduttore route={RoutesTraduttore.TRANSLATIONS} />
            </PrivateRoute>
            <PrivateRoute path={RoutesTraduttore.PROFILE} exact>
                <BaseTraduttore route={RoutesTraduttore.PROFILE} />
            </PrivateRoute>
        </Switch>
    }
    else if (user === Users.RISTORATORE) {
        return <Switch>
            <Route path="/" exact>
                <Redirect to={RoutesRistoratore.LOGIN} />
            </Route>
            <Route path={RoutesRistoratore.LOGIN} exact>
                <LoginComponent user={user} onClickBack={() => {
                    StorageUtils.remove(StorageUtils.user_type);
                    setUser(Users.NON_IMPOSTATO)
                    history.replace("/")
                }} />
            </Route>
            <Route path={RoutesRistoratore.REGISTER} exact>
                <RegisterComponent user={user} />
            </Route>
            <Route path={RoutesRistoratore.OTP} exact>
                <OTPComponent user={user} />
            </Route>
            <PrivateRoute path={RoutesRistoratore.HOME} exact>
                <BaseRistoratore route={RoutesRistoratore.HOME} />
            </PrivateRoute>
            <PrivateRoute path={RoutesRistoratore.ADD_MENU} exact>
                <BaseRistoratore route={RoutesRistoratore.ADD_MENU} />
            </PrivateRoute>
            <PrivateRoute path={RoutesRistoratore.ADD_RESTAURANT} exact>
                <BaseRistoratore route={RoutesRistoratore.ADD_RESTAURANT} />
            </PrivateRoute>
            <PrivateRoute path={RoutesRistoratore.MENUS} exact>
                <BaseRistoratore route={RoutesRistoratore.MENUS} />
            </PrivateRoute>
            <PrivateRoute path={RoutesRistoratore.PROFILE} exact>
                <BaseRistoratore route={RoutesRistoratore.PROFILE} />
            </PrivateRoute>
        </Switch>
    } else if (user === Users.CLIENTE) {
        return <Switch>
            <Route path="/" exact>
                <Redirect to={RoutesUtente.HOME} />
            </Route>
            <Route path={RoutesUtente.HOME} exact>
                <HomeUtente route={RoutesUtente.HOME} onClickLogout={()=>{
                    StorageUtils.remove(StorageUtils.user_type);
                    setUser(Users.NON_IMPOSTATO)
                    history.replace("/")
                }} />
            </Route>
            <Route path={RoutesUtente.LOGOUT} exact>
                
            </Route>
        </Switch>
    } else return <></>



}