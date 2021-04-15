import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesAmministratore } from '../../routes/Amministratore';
import { RoutesUtente } from '../../routes/Cliente';
import { RoutesRistoratore } from '../../routes/Ristoratore';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { strings } from '../../utils/Strings';
import { Users } from '../../utils/Users';
import { TopBar } from '../shared/TopBar';

interface SwitchLoginProps {
    selectedUserCallback: SelectedUserCallback
}

interface SelectedUserCallback {
    (user: Users): void
}


export const SwitchLoginComponent: React.FunctionComponent<SwitchLoginProps> = (props) => {
    return <>
        <TopBar text={strings.choose_the_user} />    
        <div className="container py-5">
           

            <div className="row my-5">
                <div className="col-12 col-md-6 col-lg-3 mb-3 mb-sm-3">
                    <Link to={RoutesTraduttore.LOGIN} className="btn btn-outline-primary w-100 btn-lg" onClick={() => props.selectedUserCallback(Users.TRADUTTORE)}>{strings.translator}</Link>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mb-3 mb-sm-3">
                    <Link to={RoutesRistoratore.LOGIN} className="btn btn-outline-primary w-100 btn-lg" onClick={() => props.selectedUserCallback(Users.RISTORATORE)}>{strings.restaurateur}</Link>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mb-3 mb-sm-0">
                    <Link to={RoutesUtente.HOME} className="btn btn-outline-primary w-100 btn-lg" onClick={() => props.selectedUserCallback(Users.CLIENTE)}>{strings.client}</Link>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mb-3 mb-sm-0">
                    <Link to={RoutesAmministratore.HOME} className="btn btn-outline-primary w-100 btn-lg" onClick={() => props.selectedUserCallback(Users.AMMINISTRATORE)}>{strings.administrator}</Link>
                </div>
            </div>
        </div>

    </>
}