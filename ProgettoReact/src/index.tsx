import { Console } from "console";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Header} from './Login';
import "./styles/app.css";
import {FirstPage} from './firstpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Reg_Translator } from "./registertranslator";
import {LoginRest} from "./loginRest";
import {Reg_Restaurateur} from "./registerrestaurant";
import {Home} from "./home";
import { Post_Traduttori } from "./postTraduttori";

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