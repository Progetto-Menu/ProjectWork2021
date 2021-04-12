import { Card } from "react-bootstrap";
import { Restaurant } from "../../../model/Restaurant";

interface RestaurantComponentProps{
    restaurant: Restaurant
}

export const RestaurantComponent: React.FunctionComponent<RestaurantComponentProps> = (props)=>{
    return <Card>

        <Card.Body>
            <div>Nome: {props.restaurant.nome}</div>
            <div>Indirizzo: {props.restaurant.indirizzo} {props.restaurant.civico}</div>
            <div>Citta: {props.restaurant.citta} ({props.restaurant.provincia})</div>

        </Card.Body>
    </Card>
}