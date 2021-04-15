import { useEffect, useState } from 'react';
import { Alert, FormControl } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Logo from '../../img/logo_google_translate.svg';
import { RoutesRistoratore } from '../../routes/Ristoratore';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { AjaxUtils } from '../../utils/AjaxUtils';
import { JSONUtils } from '../../utils/JSONUtils';
import { StorageUtils } from '../../utils/StorageUtils';
import { strings } from '../../utils/Strings';
import { Users } from '../../utils/Users';
import { AppRequest } from '../App';
import { TopBar } from '../shared/TopBar';




interface LoginProps {
      user: Users;
      onClickBack: OnClickBack
}

interface OnClickBack{
      (): void;
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
                  AjaxUtils.isLoggedIn(props.user).then((result) => {
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
      }

      return <>
            <TopBar text={strings.login}/>
            <div className="container py-5">
                 

                  <div className="row">
                        <div className="col-12 py-3 my-5 text-center mx-auto"> <img style={{width:"15%"}} src={Logo} alt="Logo" /> </div>
                        <div className="col-0 col-md-3" />
                        <div className="col-12 col-md-6">
                              <Alert className="mb-3" variant="danger" show={isVisibleAlertError} onClose={() => { setIsVisibleAlertError(false) }} dismissible>{errorMessage}</Alert>
                              <FormControl className="mb-3" type="email" placeholder={strings.your_personal_data_email} value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                              }} />
                              <FormControl type="password" placeholder={strings.your_personal_data_password} value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                              }} />
                              <div className="col-12 my-3 text-center">
                                    {/* <a href="#" className="link-primary m-4" > {strings.forgot_password} </a> */}
                              </div>
                              <div className="row no-gutters my-5 ">
                                    <div className="col-12 text-right">
                                          <button className="btn btn-secondary mr-2" onClick={() => props.onClickBack()}>{strings.go_back}</button>
                                          <button className="btn btn-primary mr-2" type="submit" onClick={() => {
                                                if (props.user !== Users.RISTORATORE && props.user !== Users.TRADUTTORE) return;
                                                AjaxUtils.login(props.user, email, password).then(res => {
                                                      const token = JSONUtils.getProperty(res.data, "token", null)
                                                      if (token != null) {
                                                            StorageUtils.set(StorageUtils.token_key, token);
                                                            if (props.user === Users.TRADUTTORE) history.push(RoutesTraduttore.HOME);
                                                            else history.push(RoutesRistoratore.HOME);
                                                      }
                                                      else {
                                                            setErrorMessage(strings.wrong_credentials)
                                                            setIsVisibleAlertError(true);
                                                      }
                                                }).catch((error) => {
                                                      setErrorMessage(strings.server_error_communication)
                                                      setIsVisibleAlertError(true);
                                                })
                                          }}> {strings.login} </button>
                                          {props.user === Users.RISTORATORE && <Link to={RoutesRistoratore.REGISTER} className="btn btn-primary">{strings.register}</Link>}
                                          {props.user === Users.TRADUTTORE && <Link to={RoutesTraduttore.REGISTER} className="btn btn-primary">{strings.register}</Link>}
                                    </div>

                              </div>
                        </div>
                        <div className="col-0 col-md-3" />
                  </div>

            </div>
      </>
}