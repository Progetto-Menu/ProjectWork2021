import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesRistoratore } from '../../routes/Ristoratore';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { Users } from '../../utils/Users';
import { TopBar } from '../shared/TopBar';
import { OTPComponent } from './OTPComponent';

interface SwitchLoginProps{
    selectedUserCallback: SelectedUserCallback
}

interface SelectedUserCallback{
    (user: Users): void
}


export const SwitchLoginComponent: React.FunctionComponent<SwitchLoginProps> = (props) => {
    return <>
        <div className="container">
            <TopBar text="Ciao, sei un Traduttore o un Ristoratore?"/>

            <div className="row my-5">
                <div className="col-0 col-md-3"></div>
                <div className="col-6 col-md-3">
                    <Link to={RoutesTraduttore.LOGIN} className="btn btn-outline-primary w-100 btn-lg" onClick={()=>props.selectedUserCallback(Users.TRADUTTORE)}>Traduttore</Link>
                </div>
                <div className="col-6 col-md-3">
                    <Link to={RoutesRistoratore.LOGIN} className="btn btn-outline-primary w-100 btn-lg" onClick={()=>props.selectedUserCallback(Users.RISTORATORE)}>Ristoratore</Link>
                </div>
                <div className="col-0 col-md-3"></div>
            </div>
        </div>

    </>
}