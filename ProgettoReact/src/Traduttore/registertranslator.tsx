import { Console } from "console";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
export {Reg_Translator};

const Reg_Translator: React.FunctionComponent = () => {
return <>
<div>   
    <div className="py-3 my-1 text-center col-6 bg-primary text-white mx-auto">
       Registrati 
    </div>
    <div className="my-5 py-5 mx-auto text-center text-nowrap h5 col-10">
        Compila il seguente Form per Registrarti come Traduttore:
    </div>    
    <div className="bg-dark w-50 text-center mx-auto">
    <div className="pt-5 col-5 mx-auto"> <input className="w-75" type="text" placeholder="Nickname"/> </div>
    <div className="my-5 col-5 mx-auto"> <input className="w-75" type="text" placeholder="Nome"/> </div>
    <div className="my-5 col-5 mx-auto"> <input className="w-75" type="text" placeholder="Cognome"/> </div>
    <div className="my-5 col-5 mx-auto"> <input className="w-75" type="text" placeholder="Email"/> </div>
    <div className="my-5 col-5 mx-auto"> <input className="w-75" type="text" placeholder="Conferma Email"/> </div>
    <div className="my-5 col-5 mx-auto"> <input className="w-75" type="password" placeholder="Password"/> </div>
    <div className="my-5 col-5 mx-auto"> <input className="w-75" type="password" placeholder="Conferma Password"/> </div>
    <div className="my-3 p-1 text-white mx-auto  "> <input type="checkbox"/> Accetto 
         <a href="#" className="link-primary m-4" > Link per il contratto </a>
    <button className="btn-danger"type="button"> Registrati </button>
    </div>
    </div>
    
</div>
</>

}