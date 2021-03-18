import { Console } from "console";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Header} from './Login';
import "./styles/app.css";
import {FirstPage} from './firstpage';



const App: React.FunctionComponent = () => {

    return <>
            <FirstPage />;
            <Header />        
        </>
}

ReactDOM.render(<App/>, document.getElementById('root'))