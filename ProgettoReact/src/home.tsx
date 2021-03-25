import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export {Home};


const Home: React.FunctionComponent = () => {
    return <>
        <div className="py-3 my-1 text-center col-6 bg-primary text-white mx-auto">
            Bentornato "personcina" 
        </div>
        <div className="py-5 my-5 text-center">
         <Link to="postRevisore"> <button className="btn-lg bg-danger" type="button"> Clicca qui </button> </Link>
        </div>
    </>
}