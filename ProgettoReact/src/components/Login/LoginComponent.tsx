import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../img/logo_menu.png';
import { Users } from '../../utils/Users';
import axios from 'axios';
import { JSONUtils } from '../../utils/JSONUtils';
import { TokenUtils } from '../../utils/TokenUtils';
import { Alert, FormControl } from 'react-bootstrap';




interface LoginProps {
      user: Users;
}


export const LoginComponent: React.FunctionComponent<LoginProps> = (props) => {

      const [user, setUser] = useState<Users>(props.user);
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [isVisibleAlertError, setIsVisibleAlertError] = useState<boolean>(false);
      const [errorMessage, setErrorMessage] = useState<string>("");

      const history = useHistory();

      return <>
            <div className="container">
                  <div className="row position-sticky sticky-top">
                        <div className="col-12 py-3 mb-1 text-center bg-primary text-white mx-auto">Login</div>
                  </div>

                  <div className="row">
                        <div className="col-12 py-3 my-5 text-center mx-auto"> <img className="" src={Logo} alt="Logo" /> </div>
                        <div className="col-0 col-md-3" />
                        <div className="col-12 col-md-6">
                              <Alert variant="danger" show={isVisibleAlertError} onClose={() => { setIsVisibleAlertError(false) }} dismissible>{errorMessage}</Alert>
                        </div>
                        <div className="col-0 col-md-3" />
                        <div className="col-0 col-md-3" />
                        <div className="col-12 col-md-6 text-center">
                              <FormControl type="email" placeholder="Email" value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                              }} />
                        </div>
                        <div className="col-0 col-md-3" />
                        <div className="col-0 col-md-3" />
                        <div className="col-12 col-md-6 my-3 text-center">
                              <FormControl type="password" placeholder="Password" value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                              }} />
                        </div>
                        <div className="col-0 col-md-3" />
                  </div>
                  <div className="my-3 p-1 text-center mx-auto">
                        <a href="#" className="link-primary m-4" > Dimenticato la Password? </a>
                  </div>
                  <div className="row my-5 ">
                        <div className="col-0 col-md-3" />
                        <div className="col-6 col-md-3">
                              <button className="btn btn-primary w-100" type="submit" onClick={() => {
                                    if (user === Users.TRADUTTORE) {
                                          axios.post("https://www.progettomenu.cloud/traduttori/login", {
                                                "email": email,
                                                "password": password
                                          }).then(res => {
                                                const token = JSONUtils.getProperty(res.data, "token", null)
                                                if (token != null) {
                                                      TokenUtils.setToken(token);
                                                      history.push("/traduttori/home");
                                                }
                                                else {
                                                      setErrorMessage("Credenziali Sbagliate")
                                                      setIsVisibleAlertError(true);
                                                }
                                          }).catch((error) => {
                                                setErrorMessage("Errore di comunicazione con il server")
                                                setIsVisibleAlertError(true);
                                          })
                                    }
                              }}> Login </button>
                        </div>
                        <div className="col-6 col-md-3">
                              {user === Users.RISTORATORE && <Link to="/ristoratori/register" className="btn btn-primary w-100">Registrati</Link>}
                              {user === Users.TRADUTTORE && <Link to="/traduttori/register" className="btn btn-primary w-100">Registrati</Link>}
                        </div>

                  </div>
            </div>
      </>
}