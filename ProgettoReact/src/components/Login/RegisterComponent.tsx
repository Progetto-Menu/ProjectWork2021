import { useState } from "react";
import { Form } from "react-bootstrap";
import { Users } from "../../utils/Users";

interface RegisterProps {
    user: Users
}

export const RegisterComponent: React.FunctionComponent<RegisterProps> = (props) => {

    const [user, setUser] = useState<Users>(props.user);

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
                    <Form.Control type="text" placeholder="Nome" />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" placeholder="Cognome" />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6">
                    <Form.Label>Conferma password</Form.Label>
                    <Form.Control type="password" placeholder="Conferma Password" />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <Form.Group className="col-12 col-md-6" controlId="ckbAccetto">
                    <Form.Check type="checkbox" label="Accetto" />
                </Form.Group>
                <div className="col-0 col-md-3" />
                <div className="col-0 col-md-3" />
                <div className="col-12 col-md-6 text-right">
                    <button className="btn btn-primary" type="button" onClick={() => {

                    }}> Registrati </button>
                </div>
                <div className="col-0 col-md-3" />
            </div>

        </div>
    </>

}