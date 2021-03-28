import React from 'react';
import { Link } from 'react-router-dom';


export const SwitchLoginComponent: React.FunctionComponent = () => {
    return <>
        <div className="container">
            <div className="row position-sticky sticky-top">
                <div className="col-12 py-3 mb-1 text-center bg-primary text-white mx-auto">Ciao, sei un Traduttore o un Ristoratore? </div>
            </div>

            <div className="row my-5">
                <div className="col-0 col-md-3"></div>
                <div className="col-6 col-md-3">
                    <Link to="/traduttori/login" className="btn btn-outline-danger w-100 btn-lg">Traduttore</Link>
                </div>
                <div className="col-6 col-md-3">
                    <Link to="/ristoratori/login" className="btn btn-outline-danger w-100 btn-lg">Ristoratore</Link>
                </div>
                <div className="col-0 col-md-3"></div>
            </div>
        </div>

    </>
}