import { Console } from "console";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/app.css";
import {PostProp} from "./interfaces";
import {PostListComponent} from "./PostListComponent";


const App: React.FunctionComponent = () => {

    return <>
            <div className="header">
                Esercizio Visualizzazione insieme di Post
            </div>
            <div className="box">
                <PostListComponent/>
            </div>
        </>
}

ReactDOM.render(<App/>, document.getElementById('root'))