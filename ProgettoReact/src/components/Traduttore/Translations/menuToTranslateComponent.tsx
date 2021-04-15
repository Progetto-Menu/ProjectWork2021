import React from 'react';
import { Card } from "react-bootstrap";
import { CustomMenuDaTradurre } from "../../../model/CustomMenuDaTradurre";
import { strings } from "../../../utils/Strings";


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
            <div>{strings.restaurant_name}: {props.menu.nome_ristorante}</div>
            <div>{strings.restaurant_address}: {props.menu.indirizzo} {props.menu.civico}</div>
            <div>{strings.restaurant_city}: {props.menu.citta} ({props.menu.sigla_provincia})</div>
            <div>{strings.restaurant_menu_id}: {props.menu.id_menu}</div>
            <div>{strings.restaurant_language_in_which_translate_menu}: {props.menu.cod_lingua.toUpperCase()}</div>
        </Card.Body>
    </Card> 
}
