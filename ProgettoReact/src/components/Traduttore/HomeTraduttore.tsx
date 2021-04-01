import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { AuthUtils } from '../../utils/AuthUtils';
import { JSONUtils } from '../../utils/JSONUtils';
import { StorageUtils } from '../../utils/StorageUtils';
import { Users } from '../../utils/Users';
import { AppRequest } from '../App';


export const HomeTraduttore: React.FunctionComponent = () => {

    const [request, setRequest] = useState<AppRequest>({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
    const history = useHistory();

    useEffect(() => {
        const checkToken = () => {
            setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
            AuthUtils.isLoggedIn(StorageUtils.get(StorageUtils.token_key), Users.TRADUTTORE).then((result) => {
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
        if (history.location.pathname === RoutesTraduttore.HOME) checkToken();
    }, [history.location.pathname])


    if (request.isLoaded && request.token == null) {
        return <Redirect to={RoutesTraduttore.LOGIN} />
    }
    else if(request.isLoaded && request.token != null && request.isUserValid === false)
    {
        return <Redirect to={RoutesTraduttore.OTP} />
    }
    else if(!request.isLoaded){
        return <></>
    }


    return <>
        <div className="py-3 my-1 text-center col-6 bg-primary text-white mx-auto">
            Bentornato "personcina"
        </div>
        <div className="py-5 my-5 text-center">
            <Link to="postRevisore"> <button className="btn-lg bg-danger" type="button"> Clicca qui </button> </Link>
        </div>
    </>
}