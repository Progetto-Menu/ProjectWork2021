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
            <Link style={firststyle} to="/Login">
            <div className="text-center my-5 py-5 "> 
                         <button className=" btn-outline-danger btn-dark btn-lg col-3 mx-5" type="button"> Traduttore </button>
                         <button className=" btn-outline-danger btn-dark btn-lg col-3 mx-5" type="button"> Ristoratore </button>                         
            </div></Link>
           
                   
        

    </>
}