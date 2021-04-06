import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo_menu.png';

export const PageLogin: React.FunctionComponent = () => {

    return <>
           <div>
                 <div className="py-3 my-1 text-center col-6 bg-secondary text-white mx-auto">Registrazione/Login</div>
                 <div className="py-3 my-5 text-center col-6 mx-auto"> <img className="" src={Logo}  alt="Logo"/> </div>
                 <div className="text-center col-6 mx-auto"> <input type="email" placeholder="email"/> </div>
                 <div className="my-3 text-center col-6 mx-auto"> <input type="password" placeholder="password"/> </div>
                 <div className="my-3 p-1 text-center mx-auto"> <a href="#" className="link-primary m-4" > Dimenticato la Password? </a> </div>
                 <div className="text-center my-5 "> 
                       <Link to="home"><button className=" btn-sm col-3 mx-5" type="submit"> Login </button></Link>
                         <Link to="/registertranslator"><button className=" btn-sm col-3 mx-5" type="button"> Register </button></Link>
                 </div>
           </div>            
        </>
}