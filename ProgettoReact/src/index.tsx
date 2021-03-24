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


const App: React.FunctionComponent = () => {
return <>
<Router>
    <div>   <Route path="/" exact component={FirstPage} />;            
            <Route path="/Login" component={Header} />;       
            <Route path="/registertranslator" component={Reg_Translator} />;     
            <Route path="/loginRest" component={LoginRest}/>;
            <Route path="/registerrestaurant" component={Reg_Restaurateur} />;
    </div> 
</Router>    
      </>
}

ReactDOM.render(<App/>, document.getElementById('root'))