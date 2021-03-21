import { Console } from "console";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Header} from './Login';
import "./styles/app.css";
import {FirstPage} from './firstpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App: React.FunctionComponent = () => {
return <>
<Router>
    <div>   <Route path="/" exact component={FirstPage} />;
            
            <Route path="/Login" component={Header} />;            
    </div> 
</Router>    
      </>
}

ReactDOM.render(<App/>, document.getElementById('root'))