import React from "react";
import ReactDOM from "react-dom";
import { Header } from './components/Traduttore/Login';
import "./styles/app.css";
import { FirstPage } from './components/firstpage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Reg_Translator } from "./components/Traduttore/registertranslator";
import { LoginRest } from "./components/Ristoratore/loginRest";
import { Reg_Restaurateur } from "./components/Ristoratore/registerrestaurant";
import { Home } from "./components/Traduttore/home";
import { Post_Traduttori } from "./components/Traduttore/postTraduttori";

const App: React.FunctionComponent = () => {

    return <>
        <Router>
            <div>   <Route path="/" exact component={FirstPage} />
                <Route path="/Login" component={Header} />
                <Route path="/registertranslator" component={Reg_Translator} />
                <Route path="/loginRest" component={LoginRest} />
                <Route path="/registerrestaurant" component={Reg_Restaurateur} />
                <Route path="/home" component={Home} />
                <Route path="/postRevisore" component={Post_Traduttori} />
            </div>
        </Router>
    </>
}

ReactDOM.render(<App />, document.getElementById('root'))