import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LanguageService, LanguageServiceMode } from "typescript";
import { Menu } from "../../../model/Menu";
import { CustomMenuDaTradurre } from "../../../model/CustomMenuDaTradurre";
import { Card } from "react-bootstrap";


interface MenuToTranslateProps{
    menu: CustomMenuDaTradurre
    onClick: OnClickMenu
}

interface OnClickMenu{
    (menu: CustomMenuDaTradurre): void
}

export const MenuToTranslateComponent: React.FunctionComponent<MenuToTranslateProps> = (props) => {
   
    return <Card className="my-3 bg-light" style={{cursor: "pointer"}} onClick={()=>props.onClick(props.menu)}>
        <Card.Body>
            <div>Nome Ristorante: {props.menu.nome_ristorante}</div>
            <div>Indirizzo: {props.menu.indirizzo} {props.menu.civico}</div>
            <div>Citta: {props.menu.citta} ({props.menu.sigla_provincia})</div>
            <div>Id Menu: {props.menu.id_menu}</div>
            <div>Lingua in Cui Tradurre il Menu: {props.menu.cod_lingua.toUpperCase()}</div>
        </Card.Body>
    </Card> 
}
