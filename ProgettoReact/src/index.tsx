import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Console } from "console";
import { FaGithub } from "react-icons/fa";
import { PageLogin } from './Traduttore/pageLogin';
import { FirstPage } from './firstpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PageRegister } from "./Traduttore/pageRegister";
import { LoginRest } from "./Ristoratore/loginRest";
import { Reg_Restaurateur } from "./Ristoratore/registerrestaurant";
import { PageHome } from "./Traduttore/pageHome";
import { PageTranslations } from "./Traduttore/pageTranslations";
import { PageProfile } from "./Traduttore/pageProfile";
import "./styles/app.css";



const App: React.FunctionComponent = () => {

return <Router>
    <div>   <Route path="/" exact component={ FirstPage } />            
            <Route path="/login" component={ PageLogin } />       
            <Route path="/registertranslator" component={ PageRegister } />     
            <Route path="/loginRest" component={ LoginRest }/>
            <Route path="/registerrestaurant" component={ Reg_Restaurateur } />
            <Route path="/home" component={ PageHome }/>
            <Route path="/translations" component={ PageTranslations }/>          
            <Route path="/profile" component={ PageProfile }/> 
    </div> 
</Router>    

}

ReactDOM.render(<App/>, document.getElementById('root'))