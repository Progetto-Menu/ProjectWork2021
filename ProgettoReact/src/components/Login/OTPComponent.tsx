import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Logo from '../../img/logo_menu.png';
import { Users } from '../../utils/Users';
import axios from 'axios';
import { JSONUtils } from '../../utils/JSONUtils';
import { Alert, Card, Form, FormControl } from 'react-bootstrap';
import { AuthUtils } from '../../utils/AuthUtils';
import OtpInput from 'react-otp-input';
import { StorageUtils } from '../../utils/StorageUtils';
import { AppRequest } from '../App';
import { RoutesRistoratore } from '../../routes/Ristoratore';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { RouterUtils } from '../../utils/RouterUtils';
import { TopBar } from '../shared/TopBar';

interface OtpProps {
      user: Users
}


export const OTPComponent: React.FunctionComponent<OtpProps> = (props) => {

      const [value, setValue] = useState<string>("");
      const [email, setEmail] = useState<string>("");
      const [isReadOnly, setIsReadOnly] = useState(true);
      const [isVisibleAlertError, setIsVisibleAlertError] = useState(false);
      const [alertMessage, setAlertMessage] = useState("");
      const [alertVariant, setAlertVariant] = useState("danger");
      const history = useHistory();
      const [request, setRequest] = useState<AppRequest>({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false });

      useEffect(() => {
            const getEmail = (user: Users) => {
                  setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: false })
                  let url = "";
                  if (user === Users.TRADUTTORE) {
                        url = "https://api.progettomenu.cloud/traduttori/emailbytoken"
                  }
                  else {
                        url = "https://api.progettomenu.cloud/ristoratori/emailbytoken"
                  }
                  axios.post(url, {
                        token: StorageUtils.get(StorageUtils.token_key)
                  }).then((result) => {
                        let email: string | null = null;
                        if (result != null) {
                              const tokenResult = JSONUtils.getProperty(result.data, "token", null);
                              email = JSONUtils.getProperty(result.data, "email", null);
                              StorageUtils.set(StorageUtils.token_key, tokenResult);
                              setEmail(email ?? "");
                        }
                        else {
                              StorageUtils.set(StorageUtils.token_key, null);
                        }
                        setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: true, email: email })
                  }).catch(() => {
                        setRequest({ token: StorageUtils.get(StorageUtils.token_key), isLoaded: true, email: null })
                  })
            }
            if (history.location.pathname === RoutesTraduttore.OTP || history.location.pathname === RoutesRistoratore.OTP) getEmail(props.user);
      }, [history.location.pathname, props.user])

      if (request.isLoaded && (request.token == null || request.email == null)) {
            StorageUtils.remove(StorageUtils.token_key);
            if (props.user === Users.TRADUTTORE) return <Redirect to={RoutesTraduttore.LOGIN} />
            else return <Redirect to={RoutesRistoratore.LOGIN} />
      }
      else if (request.isLoaded && request.email != null) {
            return <div className="container">
                  <TopBar text="Verifica OTP"/>
                  <div className="row mt-3">

                        <div className="col-0 col-md-3" />
                        <div className="col-12 col-md-6">

                              <div className="col-12">
                                    <Alert variant={alertVariant} show={isVisibleAlertError} onClose={() => { setIsVisibleAlertError(false) }} dismissible>{alertMessage}</Alert>
                              </div>
                              <Form.Group className="col-12">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" value={email} readOnly={isReadOnly} onChange={(e) => setEmail(e.target.value)} />
                              </Form.Group>



                              <div className="col-12 mb-5 text-right">
                                    <button className="btn btn-primary" type="button" onClick={() => {
                                          setIsReadOnly(!isReadOnly);
                                          if (!isReadOnly) {
                                                let url = "";
                                                if (props.user === Users.TRADUTTORE) {
                                                      url = "https://api.progettomenu.cloud/traduttori/change-email";
                                                }
                                                else {
                                                      url = "https://api.progettomenu.cloud/ristoratori/change-email";
                                                }

                                                axios.post(url, {
                                                      token: StorageUtils.get(StorageUtils.token_key),
                                                      email: email
                                                }).then((result) => {
                                                      const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
                                                      setIsVisibleAlertError(true)

                                                      if (resultAjax === "OK") {
                                                            setAlertVariant("success")
                                                            setAlertMessage("Email modificata")
                                                      }
                                                      else {
                                                            setAlertVariant("danger")
                                                            setAlertMessage("Errore durante la modifica dell'email")
                                                      }
                                                }).catch(() => {
                                                      setIsVisibleAlertError(true)
                                                      setAlertVariant("danger")
                                                      setAlertMessage("Errore di comunicazione con il server")
                                                })
                                          }


                                    }}> {isReadOnly ? <>Modifica Email</> : <>Salva Email</>} </button>
                              </div>

                              <div className="col-12">
                                    <Card>
                                          <Card.Header>Inserisci il Codice OTP</Card.Header>
                                          <Card.Body>
                                                <div className="d-flex flex-row align-items-center justify-content-center my-5">
                                                      <OtpInput inputStyle="inputStyle form-control" isInputNum={true} value={value} onChange={(val: string) => setValue(val)} numInputs={5} separator={<span>-</span>} />
                                                </div>
                                          </Card.Body>
                                          <Card.Footer>
                                                <div className="col-12 text-right px-0">
                                                      {isReadOnly ? <>
                                                            <button className="btn btn-primary mr-2" type="button" onClick={() => {
                                                                  let url = "";
                                                                  if (props.user === Users.TRADUTTORE) {
                                                                        url = "https://api.progettomenu.cloud/traduttori/verify-email";
                                                                  }
                                                                  else {
                                                                        url = "https://api.progettomenu.cloud/ristoratori/verify-email";
                                                                  }

                                                                  axios.post(url, {
                                                                        token: StorageUtils.get(StorageUtils.token_key),
                                                                        email: email
                                                                  }).then((result) => {
                                                                        const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
                                                                        setIsVisibleAlertError(true)
                                                                        if (resultAjax === "OK") {
                                                                              setAlertVariant("success")
                                                                              setAlertMessage("Email inviata all'indirizzo email specificato")
                                                                        }
                                                                        else {
                                                                              setAlertVariant("danger")
                                                                              setAlertMessage("Errore di comunicazione con il server")
                                                                        }


                                                                  }).catch((error) => {
                                                                        setIsVisibleAlertError(true)
                                                                        setAlertVariant("danger")
                                                                        setAlertMessage("Errore di comunicazione con il server")
                                                                  })
                                                            }}> Richiedi </button>
                                                            <button className="btn btn-primary" type="button" onClick={() => {
                                                                  let url = "";
                                                                  if (props.user === Users.TRADUTTORE) {
                                                                        url = "https://api.progettomenu.cloud/traduttori/validate-email";
                                                                  }
                                                                  else {
                                                                        url = "https://api.progettomenu.cloud/ristoratori/validate-email";
                                                                  }

                                                                  axios.post(url, {
                                                                        token: StorageUtils.get(StorageUtils.token_key),
                                                                        otp: value
                                                                  }).then((result) => {
                                                                        const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
                                                                        if (resultAjax === "OK") {
                                                                              if (props.user === Users.TRADUTTORE) history.replace(RoutesTraduttore.HOME);
                                                                              else history.replace(RoutesRistoratore.HOME);
                                                                        }
                                                                        else {
                                                                              setIsVisibleAlertError(true)
                                                                              setAlertVariant("danger")
                                                                              setAlertMessage("Il codice inserito non è corretto")
                                                                        }
                                                                  }).catch((error) => {
                                                                        setIsVisibleAlertError(true)
                                                                        setAlertVariant("danger")
                                                                        setAlertMessage("Errore di comunicazione con il server")
                                                                  })
                                                            }}> Verifica </button></>
                                                            : <>
                                                                  <button className="btn btn-secondary mr-2" type="button"> Richiedi </button>
                                                                  <button className="btn btn-secondary" type="button"> Verifica </button></>}

                                                </div>
                                          </Card.Footer>
                                    </Card>
                              </div>






                        </div>

                        <div className="col-0 col-md-3" />
                  </div>
            </div>

      }
      else {
            return <></>
      }



}