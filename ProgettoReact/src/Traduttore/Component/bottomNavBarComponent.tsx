import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bottomNavBarProp, bottomNavBar } from "../Prop/bottomNavBarProp";

export const BottomNavBarComponent: React.FunctionComponent<bottomNavBarProp> = (prop) => {

    return <div className="text-center fixed-bottom">        
            <Link to="home">
                  {prop.type == bottomNavBar.home ? 
                        <button style={{background: "green", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark "> 
                              Home 
                        </button>
                        :
                        <button style={{background: "grey", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark "> 
                              Home 
                        </button>
                  } 
           </Link>
           <Link to="Translations">
                  {prop.type == bottomNavBar.translations ? 
                        <button style={{background: "green", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark "> 
                              Translations 
                        </button>
                        :
                        <button style={{background: "grey", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark "> 
                              Translations 
                        </button>
                  } 
           </Link> 
           <Link to="Profile">
                  {prop.type == bottomNavBar.profile ? 
                        <button style={{background: "green", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark "> 
                              Profile 
                        </button>
                        :
                        <button style={{background: "grey", width: "20%" }} className="py-3 my-1 text-center col-6 mx-auto rounded border-secondary text-dark "> 
                              Profile 
                        </button>
                  } 
           </Link> 
    </div>
}