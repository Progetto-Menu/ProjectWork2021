import ReactDOM from "react-dom";
import React, { Component } from 'react';
import {FaGithub, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import {MdCode} from "react-icons/md";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export {FirstPage};


const FirstPage: React.FunctionComponent = () => {
    const firststyle = {
        color: 'white'
    };
    return <>
        <div>
             <div className="py-3 my-1 text-center col-6 bg-primary text-white mx-auto">Ciao, sei un Traduttore o un Ristoratore? </div>
        </div>
            
            <div className="text-center my-5 py-5 "> 
            <Link style={firststyle} to="/Login">  <button className=" btn-outline-danger btn-dark btn-lg col-3 mx-5" type="button"> Traduttore </button> </Link>
            <Link style={firststyle} to="/loginRest"> <button className=" btn-outline-danger btn-dark btn-lg col-3 mx-5" type="button"> Ristoratore </button> </Link>
            </div>
            <div>
                <FaGithub size="2em" color="cornflowerblue"/> ciao 
                <FaEnvelope /> luca 
                <MdCode /> lorenzo 
                <FaArrowLeft /> eei
            </div>
    </>
}