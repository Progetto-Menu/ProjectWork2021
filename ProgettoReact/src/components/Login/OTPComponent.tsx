import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Logo from '../../img/logo_menu.png';
import { Users } from '../../utils/Users';
import axios from 'axios';
import { JSONUtils } from '../../utils/JSONUtils';
import { Alert, Button, Card, Form, FormControl } from 'react-bootstrap';
import { AjaxUtils } from '../../utils/AjaxUtils';
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

      useEffect(() => {
            const getEmail = (user: Users) => {
                  AjaxUtils.getUser(user).then((result) => {
                        let email: string | null = null;
                        if (result != null) {
                              email = JSONUtils.getProperty(result.data, "email", null);
                              setEmail(email ?? "");
                        }
                        else {
                              StorageUtils.set(StorageUtils.token_key, null);
                        }
                  }).catch(() => {
                  })
            }
            getEmail(props.user);
      }, [props.user])


      return <div className="container py-5">
            <TopBar text="Verifica OTP" />
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
                              <Button variant="secondary" className="mr-2" onClick={()=>{
                                    StorageUtils.remove(StorageUtils.token_key);
                                    StorageUtils.remove(StorageUtils.user_type);
                                    history.replace("/")
                              }}>Indietro</Button>
                              <button className="btn btn-primary" type="button" onClick={() => {
                                    setIsReadOnly(!isReadOnly);
                                    if (!isReadOnly) {
                                          AjaxUtils.changeEmail(props.user, email).then((result) => {
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
                                                            AjaxUtils.requestOtp(props.user, email).then((result) => {
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
                                                            AjaxUtils.verifyOtp(props.user, value).then((result) => {
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