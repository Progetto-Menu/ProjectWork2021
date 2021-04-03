import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Users } from "../../utils/Users";
import axios from "axios";
import { JSONUtils } from "../../utils/JSONUtils";
import { useHistory } from "react-router";
import { RoutesTraduttore } from "../../routes/Traduttore";
import { RoutesRistoratore } from "../../routes/Ristoratore";
import { StorageUtils } from "../../utils/StorageUtils";
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
            <TopBar text="Registrati"/>

            <div className="row">
                <div className="col-12 my-3 mx-auto text-center h5 col-10">
                    {props.user === Users.TRADUTTORE && <>Compila il seguente Form per Registrarti come Traduttore:</>}
                    {props.user === Users.RISTORATORE && <>Compila il seguente Form per Registrarti come Ristoratore:</>}
                </div>
                
                <div className="col-0 col-md-3" />
                <div className="col-12 col-md-6">
                <Alert className="col-12" variant="danger" show={isVisibleAlertError} onClose={() => { setIsVisibleAlertError(false) }} dismissible>{errorMessage}</Alert>
                    <Form.Group className="col-12">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => {
                            setNome(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder="Cognome" value={cognome} onChange={(e) => {
                            setCognome(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>Conferma password</Form.Label>
                        <Form.Control type="password" placeholder="Conferma Password" value={confermaPassword} onChange={(e) => {
                            setConfermaPassword(e.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="col-12 col-md-6" controlId="ckbAccetto">
                        <Form.Check type="checkbox" label="Accetto" onChange={(e) => {
                            setAccetto(e.target.checked)
                        }} checked={accetto} />
                    </Form.Group>
                    <div className="col-12 text-right">
                        <button className="btn btn-secondary mr-2" onClick={()=>{
                            if(props.user === Users.TRADUTTORE) history.replace(RoutesTraduttore.LOGIN);
                            else if(props.user=== Users.RISTORATORE) history.replace(RoutesRistoratore.LOGIN);
                        }}> Indietro </button>
                        <button className="btn btn-primary" type="button" onClick={() => {
                            if(nome === "" || cognome === "" || email === "" || password === "" || confermaPassword === ""){
                                setErrorMessage("Compilare tutti i campi")
                                setIsVisibleAlertError(true);
                                return;
                            }
                            if(password !== confermaPassword) {
                                setErrorMessage("Le due password non coincidono")
                                setIsVisibleAlertError(true);
                                return;
                            }
                            if(accetto === false) {
                                setErrorMessage("Spuntare accetto per proseguire")
                                setIsVisibleAlertError(true);
                                return;
                            }
                            if (props.user !== Users.RISTORATORE && props.user !== Users.TRADUTTORE) return;
                            let url = "";
                            if (props.user === Users.TRADUTTORE) {
                                url = "https://api.progettomenu.cloud/traduttori/register";
                            }
                            else {
                                url = "https://api.progettomenu.cloud/ristoratori/register";
                            }
                            axios.post(url, {
                                "email": email,
                                "password": password,
                                "nome": nome,
                                "cognome": cognome
                            }).then(res => {
                                const token = JSONUtils.getProperty(res.data, "token", null)
                                if (token != null) {
                                    StorageUtils.set(StorageUtils.token_key,token);
                                    history.replace("/traduttori/home");
                                }
                                else {
                                    //setErrorMessage("Credenziali Sbagliate")
                                    //setIsVisibleAlertError(true);
                                }
                            }).catch((error) => {
                                setErrorMessage("Errore di comunicazione con il server")
                                setIsVisibleAlertError(true);
                            })
                        }}> Registrati </button>
                    </div>
                </div>

                <div className="col-0 col-md-3" />
            </div>

        </div>
    </>

}