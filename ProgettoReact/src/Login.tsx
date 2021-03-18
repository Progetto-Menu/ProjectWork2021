import ReactDOM from "react-dom";
import React, { Component } from 'react';
import Logo from '../src/img/logo_menu.png';
export {Header};

const Header: React.FunctionComponent = () => {

    return <>
           <div>
                 <div className="py-3 my-1 text-center col-6 bg-secondary text-white mx-auto">Titolo</div>
                 <div className="py-3 my-5 text-center col-6 mx-auto"> <img className="" src={Logo}  alt="Logo"/> </div>
                 <div className="text-center col-6 mx-auto"> <input type="email" placeholder="email"/> </div>
                 <div className="my-3 text-center col-6 mx-auto"> <input type="password" placeholder="password"/> </div>
                 <div className="my-3 p-1 text-center mx-auto"> <input type="checkbox"/> Hai scordato la password? </div>
                 <div> 
                         <div className="my-3 text-center col-6 mx-auto"> <button type="submit"> Submit </button>
                              <div className="d-inline text-center col-6 mx-auto"> <button type="button"> Register </button></div>
                         </div>
                 </div>
           </div>
            
        </>
}