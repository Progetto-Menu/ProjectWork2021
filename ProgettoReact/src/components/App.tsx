import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from '../utils/RouterUtils';
import { Users } from '../utils/Users';
import { LoginComponent } from './Login/LoginComponent';
import { RegisterComponent } from './Login/RegisterComponent';
import { SwitchLoginComponent } from './Login/SwitchLoginComponent';
export const App: React.FunctionComponent = () => {

    return <>
        <Router>
            <div>
                <Route path="/" exact component={SwitchLoginComponent} />
                <Route path="/traduttori/login" exact>
                    <LoginComponent user={Users.TRADUTTORE} />
                </Route>
                <Route path="/traduttori/register" exact>
                    <RegisterComponent user={Users.TRADUTTORE} />
                </Route>
                <Route path="/ristoratori/login" exact>
                    <LoginComponent user={Users.RISTORATORE} />
                </Route>
                <Route path="/ristoratori/register" exact>
                    <RegisterComponent user={Users.RISTORATORE} />
                </Route>
                <PrivateRoute path="/ristoratori/home" exact user={Users.RISTORATORE} />
            </div>
        </Router>
    </>
}