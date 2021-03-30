import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export {BottomNavBar};

const BottomNavBar: React.FunctionComponent = () => {

    return <>
    <div className="text-center fixed-bottom">        
        <Link to="home"><button style={{background: "grey", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark "> 
                 Home 
           </button></Link>              
           <button style={{background: "green", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark ">
                 Traduzioni
           </button>     
           <button style={{background: "grey", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark ">
                 Profilo
           </button>    
    </div>       
    </>

}