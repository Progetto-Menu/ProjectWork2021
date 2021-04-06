import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export const SearchBar: React.FunctionComponent = () => {

    return <>
        <div className=" p-3 mb-5 col-8 bg-primary text-white text-center mx-auto">
           <input type="text" className=" w-75 text-center border borderless " placeholder="Search"/>
        </div>
    </>

}