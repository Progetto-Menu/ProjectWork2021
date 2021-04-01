import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserProp } from "../Prop/userProp";


export const WelcomeBackComponent: React.FunctionComponent<UserProp> = (prop) => {
    return <>
        <div className="py-3 my-1 text-center col-6 bg-primary text-white mx-auto">
            Bentornato {prop.name} 
        </div>
    </>
}