import { Console } from "console";
import React, { useState } from "react";
import {FaGithub} from "react-icons/fa";
import ReactDOM from "react-dom";
import {Header} from './Traduttore/Login';
import "./styles/app.css";
import {FirstPage} from './firstpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Reg_Translator } from "./Traduttore/registertranslator";
import {LoginRest} from "./Ristoratore/loginRest";
import {Reg_Restaurateur} from "./Ristoratore/registerrestaurant";
import {Home} from "./Traduttore/home";
import { Post_Traduttori } from "./Traduttore/postTraduttori";

const App: React.FunctionComponent = () => {

return <>
<Router>
    <div>   <Route path="/" exact component={FirstPage} />            
            <Route path="/Login" component={Header} />       
            <Route path="/registertranslator" component={Reg_Translator} />     
            <Route path="/loginRest" component={LoginRest}/>
            <Route path="/registerrestaurant" component={Reg_Restaurateur} />
            <Route path="/home" component={Home}/>
            <Route path="/postRevisore" component={Post_Traduttori} />            
            
    </div> 
</Router>    
      </>
}

ReactDOM.render(<App/>, document.getElementById('root'))