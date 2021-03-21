import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export {FirstPage};


const FirstPage: React.FunctionComponent = () => {
    const firststyle = {
        color: 'white'
    };
    return <>
        <div>
             <div className="py-3 my-1 text-center col-6 bg-primary text-white mx-auto">Ciao, sei un Traduttore o un Ristoratore? </div>
        </div>
        <div>
            <Link style={firststyle} to="/Login">
                <div className=" my-5 text-center">  <button type="button"> Traduttore </button> 
                     <div className="d-inline text-center"> <button type="button"> Ristoratore </button></div>
                </div></Link>            
        </div>

    </>
}