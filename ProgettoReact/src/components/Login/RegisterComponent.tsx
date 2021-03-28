import { useState } from "react";
import { Form } from "react-bootstrap";
import { Users } from "../../utils/Users";
import axios from "axios";
import { JSONUtils } from "../../utils/JSONUtils";
import { TokenUtils } from "../../utils/TokenUtils";
import { useHistory } from "react-router";

interface RegisterProps {
    user: Users
}

export const RegisterComponent: React.FunctionComponent<RegisterProps> = (props) => {

    const [user, setUser] = useState<Users>(props.user);

    const [nome, setNome] = useState<string>("");
    const [cognome, setCognome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confermaPassword, setConfermaPassword] = useState<string>("");
    const [accetto, setAccetto] = useState<boolean>(false);

    const history = useHistory();

    return <>
        <div className="container mb-3">
            <div className="row position-sticky sticky-top">
                <div className="col-12 py-3 mb-3 text-center bg-primary text-white mx-auto">
                    Registrati
                </div>
            </div>

            <div className="row">
                <div className="col-12 my-3 mx-auto text-center h5 col-10">
                    {user === Users.TRADUTTORE && <>Compila il seguente Form per Registrarti come Traduttore:</>}
                    {user === Users.RISTORATORE && <>Compila il seguente Form per Registrarti come Ristoratore:</>}
                </div>
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e)=>{
                        setNome(e.target.value);
                    }} />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" placeholder="Cognome" value={cognome} onChange={(e)=>{
                        setCognome(e.target.value);
                    }} />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>{
                        setEmail(e.target.value);
                    }} />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }} />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Conferma password</Form.Label>
                    <Form.Control type="password" placeholder="Conferma Password" value={confermaPassword} onChange={(e)=>{
                        setConfermaPassword(e.target.value);
                    }} />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6" controlId="ckbAccetto">
                    <Form.Check type="checkbox" label="Accetto" onChange={(e)=>{
                        setAccetto(e.target.checked)
                    }} checked={accetto}/>
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <div className="col-12 col-md-6 text-right">
                    <button className="btn btn-primary" type="button" onClick={() => {
                        if(user === Users.TRADUTTORE){
                            axios.post("https://www.progettomenu.cloud/traduttori/register", {
                                "email": email,
                                "password": password,
                                "nome": nome,
                                "cognome": cognome
                          }).then(res => {
                                const token = JSONUtils.getProperty(res.data, "token", null)
                                if (token != null) {
                                      TokenUtils.setToken(token);
                                      history.push("/traduttori/home");
                                }
                                else {
                                      //setErrorMessage("Credenziali Sbagliate")
                                      //setIsVisibleAlertError(true);
                                }
                          }).catch((error) => {
                                //setErrorMessage("Errore di comunicazione con il server")
                                //setIsVisibleAlertError(true);
                          })
                        }
                    }}> Registrati </button>
                </div>
                <div className="col-0 col-md-3" />
            </div>

        </div>
    </>

}