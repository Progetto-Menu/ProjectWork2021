import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { RoutesRistoratore } from "../../routes/Ristoratore";
import { RoutesTraduttore } from "../../routes/Traduttore";
import { AjaxUtils } from "../../utils/AjaxUtils";
import { JSONUtils } from "../../utils/JSONUtils";
import { StorageUtils } from "../../utils/StorageUtils";
import { strings } from "../../utils/Strings";
import { Users } from "../../utils/Users";
import { TopBar } from "../shared/TopBar";

interface RegisterProps {
    user: Users
}

export const RegisterComponent: React.FunctionComponent<RegisterProps> = (props) => {
    const [nome, setNome] = useState<string>("");
    const [cognome, setCognome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confermaPassword, setConfermaPassword] = useState<string>("");
    const [accetto, setAccetto] = useState<boolean>(false);
    const [isVisibleAlertError, setIsVisibleAlertError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const history = useHistory();

    return <>
        <div className="container py-5">
            <TopBar text={strings.register}/>

            <div className="row">
                <div className="col-12 my-3 mx-auto text-center h5 col-10">
                    {props.user === Users.TRADUTTORE && <>{strings.compile_the_form_to_regiter_as_translator}</>}
                    {props.user === Users.RISTORATORE && <>{strings.compile_the_form_to_regiter_as_restaurateur}</>}
                </div>
                
                <div className="col-0 col-md-3" />
                <div className="col-12 col-md-6">
                <Alert className="col-12" variant="danger" show={isVisibleAlertError} onClose={() => { setIsVisibleAlertError(false) }} dismissible>{errorMessage}</Alert>
                    <Form.Group className="col-12">
                        <Form.Label>{strings.your_personal_data_name}</Form.Label>
                        <Form.Control type="text" placeholder={strings.your_personal_data_name} value={nome} onChange={(e) => {
                            setNome(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>{strings.your_personal_data_surname}</Form.Label>
                        <Form.Control type="text" placeholder={strings.your_personal_data_surname} value={cognome} onChange={(e) => {
                            setCognome(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>{strings.your_personal_data_email}</Form.Label>
                        <Form.Control type="email" placeholder={strings.your_personal_data_email} value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>{strings.your_personal_data_password}</Form.Label>
                        <Form.Control type="password" placeholder={strings.your_personal_data_password} value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>{strings.your_personal_data_confirm_password}</Form.Label>
                        <Form.Control type="password" placeholder={strings.your_personal_data_confirm_password} value={confermaPassword} onChange={(e) => {
                            setConfermaPassword(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12 col-md-6" controlId="ckbAccetto">
                        <Form.Check type="checkbox" label={strings.agree} onChange={(e) => {
                            setAccetto(e.target.checked)
                        }} checked={accetto} />
                    </Form.Group>
                    <div className="col-12 text-right">
                        <button className="btn btn-secondary mr-2" onClick={()=>{
                            if(props.user === Users.TRADUTTORE) history.replace(RoutesTraduttore.LOGIN);
                            else if(props.user=== Users.RISTORATORE) history.replace(RoutesRistoratore.LOGIN);
                        }}> {strings.go_back} </button>
                        <button className="btn btn-primary" type="button" onClick={() => {
                            if(nome === "" || cognome === "" || email === "" || password === "" || confermaPassword === ""){
                                setErrorMessage(strings.compile_all_fields)
                                setIsVisibleAlertError(true);
                                return;
                            }
                            if(password !== confermaPassword) {
                                setErrorMessage(strings.the_two_passwords_are_not_equal)
                                setIsVisibleAlertError(true);
                                return;
                            }
                            if(accetto === false) {
                                setErrorMessage(strings.check_i_agree_to_continue)
                                setIsVisibleAlertError(true);
                                return;
                            }
                            if (props.user !== Users.RISTORATORE && props.user !== Users.TRADUTTORE) return;
                            AjaxUtils.register(props.user, email, password, nome, cognome).then(res => {
                                const token = JSONUtils.getProperty(res.data, "token", null)
                                if (token != null) {
                                    StorageUtils.set(StorageUtils.token_key,token);
                                    if(props.user === Users.TRADUTTORE) history.replace(RoutesTraduttore.HOME)
                                    if(props.user === Users.RISTORATORE) history.replace(RoutesRistoratore.HOME)
                                }
                                else {
                                    //setErrorMessage("Credenziali Sbagliate")
                                    //setIsVisibleAlertError(true);
                                }
                            }).catch((error) => {
                                setErrorMessage(strings.server_error_communication)
                                setIsVisibleAlertError(true);
                            })
                        }}> {strings.register} </button>
                    </div>
                </div>

                <div className="col-0 col-md-3" />
            </div>

        </div>
    </>

}