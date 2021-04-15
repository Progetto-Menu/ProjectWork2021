import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap"
import { Dish } from "../../../model/Dish"
import { strings } from "../../../utils/Strings";

interface DishComponentProps {
    dish: Dish
    onChange: OnChange
    onClickRemove: OnClickRemove
}

interface OnChange{
    (dish: Dish): void
}

interface OnClickRemove{
    (dish: Dish): void
}
export const DishComponent: React.FunctionComponent<DishComponentProps> = (props) => {

    const [titolo, setTitolo] = useState<string>(props.dish.name);
    const [descrizione, setDescrizione] = useState<string>(props.dish.description);
    const [prezzo, setPrezzo] = useState<number>(props.dish.price);

    useEffect(()=>{
        setTitolo(props.dish.name);
        setDescrizione(props.dish.description)
        setPrezzo(props.dish.price)
    }, [props.dish])

    return <Card className="my-3" bg="success" text="white">
        <Card.Header>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div>{titolo === "" ? strings.dish : titolo}</div>
                <Button variant="danger" onClick={()=> props.onClickRemove(props.dish)}>{strings.remove}</Button>
            </div>
            
    </Card.Header>
        <Card.Body>
            <Form.Group className="col-12">
                <Form.Label>{strings.title}</Form.Label>
                <Form.Control type="text" placeholder={strings.title} value={titolo} onChange={(e) => {
                    setTitolo(e.target.value);
                    props.onChange({
                        id: props.dish.id,
                        name: e.target.value,
                        description: descrizione,
                        price: prezzo
                    })
                }} />
            </Form.Group>
            <Form.Group className="col-12">
                <Form.Label>{strings.description}</Form.Label>
                <textarea rows={3} className="form-control" style={{resize: "none"}} placeholder={strings.description} value={descrizione} onChange={(e) => {
                    setDescrizione(e.target.value);
                    props.onChange({
                        id: props.dish.id,
                        name: titolo,
                        description: e.target.value,
                        price: prezzo
                    })
                }} ></textarea>
            </Form.Group>
            <Form.Group className="col-12">
                <Form.Label>{strings.price}</Form.Label>
                <Form.Control type="number" placeholder={strings.price} value={prezzo} onChange={(e) => {
                    if(!Number.isNaN(parseFloat(e.target.value))){
                        setPrezzo(parseFloat(e.target.value));
                        props.onChange({
                            id: props.dish.id,
                            name: titolo,
                            description: descrizione,
                            price: parseFloat(e.target.value)
                        })
                    }
                }} />
            </Form.Group>
        </Card.Body>
    </Card>
}