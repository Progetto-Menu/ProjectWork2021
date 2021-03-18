import ReactDOM from "react-dom";
import React, { Component } from 'react';
export {FirstPage};


const FirstPage: React.FunctionComponent = () => {
    return <>
        <div>
             <div className="py-3 my-1 text-center col-6 bg-primary text-white mx-auto">Ciao, sei un Traduttore o un Ristoratore? </div>
        </div>
        <div>
            <div className=" my-5 text-center"> <button type="button"> Traduttore </button>
                <div className="d-inline text-center"> <button type="button"> Ristoratore </button></div>
            </div>
        </div>
    </>
}