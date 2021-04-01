import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Redirect, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { RoutesRistoratore } from '../routes/Ristoratore';
import { RoutesTraduttore } from '../routes/Traduttore';
import { Users } from '../utils/Users';
import { LoginComponent } from './Login/LoginComponent';
import { OTPComponent } from './Login/OTPComponent';
import { RegisterComponent } from './Login/RegisterComponent';
import { SwitchLoginComponent } from './Login/SwitchLoginComponent';
import { HomeTraduttore } from './Traduttore/HomeTraduttore';
import { HomeRistoratore } from './Ristoratore/HomeRistoratore';
import { StorageUtils } from '../utils/StorageUtils';

export interface AppRequest {
    token: string | null,
    isLoaded: boolean,
    isUserValid?: boolean,
    email?: string | null
}
export const App: React.FunctionComponent = () => {
    const [user, setUser] = useState<Users>(Users.NON_IMPOSTATO);
    const history = useHistory();

    if (user === Users.NON_IMPOSTATO) {
        console.log(user);
        return <Switch>
            <Route path="/" exact>
                <SwitchLoginComponent selectedUserCallback={(u) => {
                    setUser(u);
                }} />
            </Route>
        </Switch>
    }
    else if (user === Users.TRADUTTORE) {
        return <Switch>
            <Route path="/" exact>
                <SwitchLoginComponent selectedUserCallback={(u) => {
                    setUser(u);
                }} />
            </Route>
            <Route path={RoutesTraduttore.LOGIN} exact>
                <LoginComponent user={user} />
            </Route>
            <Route path={RoutesTraduttore.REGISTER} exact>
                <RegisterComponent user={user} />
            </Route>
            <Route path={RoutesTraduttore.OTP} exact>
               <OTPComponent user={user} />
            </Route>
            <Route path={RoutesTraduttore.HOME} exact>
                <HomeTraduttore />
            </Route>
        </Switch>
    }
    else if (user === Users.RISTORATORE) {
        return <Switch>
            <Route path="/" exact>
                <SwitchLoginComponent selectedUserCallback={(u) => {
                    setUser(u);
                }} />
            </Route>
            <Route path={RoutesRistoratore.LOGIN} exact>
                <LoginComponent user={user} />
            </Route>
            <Route path={RoutesRistoratore.REGISTER} exact>
                <RegisterComponent user={user} />
            </Route>
            <Route path={RoutesRistoratore.OTP} exact>
               <OTPComponent user={user} />
            </Route>
            <Route path={RoutesRistoratore.HOME} exact>
                <HomeRistoratore />
            </Route>
        </Switch>
    } else return <></>



}