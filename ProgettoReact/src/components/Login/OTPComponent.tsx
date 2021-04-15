import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router-dom';
import { RoutesRistoratore } from '../../routes/Ristoratore';
import { RoutesTraduttore } from '../../routes/Traduttore';
import { AjaxUtils } from '../../utils/AjaxUtils';
import { JSONUtils } from '../../utils/JSONUtils';
import { StorageUtils } from '../../utils/StorageUtils';
import { strings } from '../../utils/Strings';
import { Users } from '../../utils/Users';
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
            <TopBar text={strings.verify_otp} />
            <div className="row mt-3">

                  <div className="col-0 col-md-3" />
                  <div className="col-12 col-md-6">

                        <div className="col-12">
                              <Alert variant={alertVariant} show={isVisibleAlertError} onClose={() => { setIsVisibleAlertError(false) }} dismissible>{alertMessage}</Alert>
                        </div>
                        <Form.Group className="col-12">
                              <Form.Label>{strings.your_personal_data_email}</Form.Label>
                              <Form.Control type="email" placeholder={strings.your_personal_data_email} value={email} readOnly={isReadOnly} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>



                        <div className="col-12 mb-5 text-right">
                              <Button variant="secondary" className="mr-2" onClick={()=>{
                                    StorageUtils.remove(StorageUtils.token_key);
                                    StorageUtils.remove(StorageUtils.user_type);
                                    history.replace("/")
                              }}>{strings.go_back}</Button>
                              <button className="btn btn-primary" type="button" onClick={() => {
                                    setIsReadOnly(!isReadOnly);
                                    if (!isReadOnly) {
                                          AjaxUtils.changeEmail(props.user, email).then((result) => {
                                                const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
                                                setIsVisibleAlertError(true)

                                                if (resultAjax === "OK") {
                                                      setAlertVariant("success")
                                                      setAlertMessage(strings.email_edited)
                                                }
                                                else {
                                                      setAlertVariant("danger")
                                                      setAlertMessage(strings.error_while_editing_email)
                                                }
                                          }).catch(() => {
                                                setIsVisibleAlertError(true)
                                                setAlertVariant("danger")
                                                setAlertMessage(strings.server_error_communication)
                                          })
                                    }


                              }}> {isReadOnly ? <>{strings.edit}</> : <>{strings.save}</>} </button>
                        </div>

                        <div className="col-12">
                              <Card>
                                    <Card.Header>{strings.insert_the_otp_code}</Card.Header>
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
                                                                        setAlertMessage(strings.email_sent)
                                                                  }
                                                                  else {
                                                                        setAlertVariant("danger")
                                                                        setAlertMessage(strings.server_error_communication)
                                                                  }


                                                            }).catch((error) => {
                                                                  setIsVisibleAlertError(true)
                                                                  setAlertVariant("danger")
                                                                  setAlertMessage(strings.server_error_communication)
                                                            })
                                                      }}> {strings.request} </button>
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
                                                                        setAlertMessage(strings.the_code_inserted_is_not_correctd)
                                                                  }
                                                            }).catch((error) => {
                                                                  setIsVisibleAlertError(true)
                                                                  setAlertVariant("danger")
                                                                  setAlertMessage(strings.server_error_communication)
                                                            })
                                                      }}> {strings.verify} </button></>
                                                      : <>
                                                            <button className="btn btn-secondary mr-2" type="button"> {strings.request} </button>
                                                            <button className="btn btn-secondary" type="button"> {strings.verify} </button></>}

                                          </div>
                                    </Card.Footer>
                              </Card>
                        </div>






                  </div>

                  <div className="col-0 col-md-3" />
            </div>
      </div>



}