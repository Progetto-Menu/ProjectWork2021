import { Console } from "console";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Header} from './Login';
import "./styles/app.css";



const App: React.FunctionComponent = () => {

    return <>
            <Header />        
        </>
}

ReactDOM.render(<App/>, document.getElementById('root'))