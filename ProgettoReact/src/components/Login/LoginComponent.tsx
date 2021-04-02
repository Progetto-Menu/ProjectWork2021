import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Logo from '../../img/logo_menu.png';
import { Users } from '../../utils/Users';
import axios from 'axios';
import { JSONUtils } from '../../utils/JSONUtils';
import { StorageUtils } from '../../utils/StorageUtils';
import { Alert, FormControl } from 'react-bootstrap';
import { AuthUtils } from '../../utils/AuthUtils';
import { AppRequest } from '../App';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { RoutesRistoratore } from '../../routes/Ristoratore';




interface LoginProps {
      user: Users;
}


export const LoginComponent: React.FunctionComponent<LoginProps> = (props) => {
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [isVisibleAlertError, setIsVisibleAlertError] = useState<boolean>(false);
      const [errorMessage, setErrorMessage] = useState<string>("");
      const [request, setRequest] = useState<AppRequest>({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })

      const history = useHistory();

      useEffect(() => {
            const checkToken = () => {
                  setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
                  AuthUtils.isLoggedIn(StorageUtils.get(StorageUtils.token_key), props.user).then((result) => {
                        if (result != null) {
                              const tokenResult = JSONUtils.getProperty(result.data, "token", null);
                              StorageUtils.set(StorageUtils.token_key, tokenResult);
                        }
                        else {
                              StorageUtils.set(StorageUtils.token_key, null);
                        }
                        setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: true });

                  }).catch(() => {
                        StorageUtils.set(StorageUtils.token_key, null);
                        setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: true });
                  })
            }
            if (history.location.pathname === RoutesTraduttore.LOGIN || history.location.pathname === RoutesRistoratore.LOGIN) checkToken();
      }, [history.location.pathname, props.user])

      if(request.isLoaded && request.token != null){
            if(props.user===Users.TRADUTTORE) return <Redirect to={RoutesTraduttore.HOME}/>
            else return <Redirect to={RoutesRistoratore.HOME}/>
      } else if(!request.isLoaded){
            return <></>
      }

      return <>
            <div className="container">
                  <div className="row position-sticky sticky-top">
                        <div className="col-12 py-3 mb-1 text-center bg-primary text-white mx-auto">Login</div>
                  </div>

                  <div className="row">
                        <div className="col-12 py-3 my-5 text-center mx-auto"> <img className="" src={Logo} alt="Logo" /> </div>
                        <div className="col-0 col-md-3" />
                        <div className="col-12 col-md-6">
                              <Alert className="mb-3" variant="danger" show={isVisibleAlertError} onClose={() => { setIsVisibleAlertError(false) }} dismissible>{errorMessage}</Alert>
                              <FormControl className="mb-3" type="email" placeholder="Email" value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                              }} />
                              <FormControl type="password" placeholder="Password" value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                              }} />
                              <div className="col-12 my-3 text-center">
                                    <a href="#" className="link-primary m-4" > Dimenticato la Password? </a>
                              </div>
                              <div className="row no-gutters my-5 ">
                                    <div className="col-12 text-right">
                                          <button className="btn btn-secondary mr-2" onClick={
                                                () => { 
                                                      history.replace("/") 
                                                }
                                          }>Indietro</button>
                                          <button className="btn btn-primary mr-2" type="submit" onClick={() => {
                                                if (props.user !== Users.RISTORATORE && props.user !== Users.TRADUTTORE) return;
                                                let url = "";
                                                if (props.user === Users.TRADUTTORE) {
                                                      url = "https://api.progettomenu.cloud/traduttori/login";
                                                }
                                                else {
                                                      url = "https://api.progettomenu.cloud/ristoratori/login";
                                                }
                                                axios.post(url, {
                                                      "email": email,
                                                      "password": password
                                                }).then(res => {
                                                      const token = JSONUtils.getProperty(res.data, "token", null)
                                                      if (token != null) {
                                                            StorageUtils.set(StorageUtils.token_key, token);
                                                            if (props.user === Users.TRADUTTORE) history.push(RoutesTraduttore.HOME);
                                                            else history.push(RoutesRistoratore.HOME);
                                                      }
                                                      else {
                                                            setErrorMessage("Credenziali Sbagliate")
                                                            setIsVisibleAlertError(true);
                                                      }
                                                }).catch((error) => {
                                                      setErrorMessage("Errore di comunicazione con il server")
                                                      setIsVisibleAlertError(true);
                                                })
                                          }}> Login </button>
                                          {props.user === Users.RISTORATORE && <Link to={RoutesRistoratore.REGISTER} className="btn btn-primary">Registrati</Link>}
                                          {props.user === Users.TRADUTTORE && <Link to={RoutesTraduttore.REGISTER} className="btn btn-primary">Registrati</Link>}
                                    </div>

                              </div>
                        </div>
                        <div className="col-0 col-md-3" />
                  </div>

            </div>
      </>
}