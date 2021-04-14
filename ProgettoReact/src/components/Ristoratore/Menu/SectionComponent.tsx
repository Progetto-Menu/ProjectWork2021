import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap"
import { Dish } from "../../../model/Dish";
import { Section } from "../../../model/Section"
import { DishComponent } from "./DishComponent"

interface SectionComponentProps {
    section: Section
    onChange: OnChange
}

interface OnChange {
    (section: Section): void
}

export const SectionComponent: React.FunctionComponent<SectionComponentProps> = (props) => {

    const [titolo, setTitolo] = useState<string>(props.section.name);
    const [sottotitolo, setSottotitolo] = useState<string>(props.section.subtitle);
    const [dishes, setDishes] = useState<Dish[]>(props.section.dishes);

    const [nomePiatto, setNomePiatto] = useState<string>("");

    useEffect(() => {
        setTitolo(props.section.name)
        setSottotitolo(props.section.subtitle)
        setDishes(props.section.dishes)
    }, [props.section])

    return <Card className="my-3" bg="warning">
        <Card.Header>
            {titolo === "" ? "Sezione": titolo}
        </Card.Header>
        <Card.Body>
            <Form.Group className="col-12">
                <Form.Label>Titolo</Form.Label>
                <Form.Control type="text" placeholder="Titolo" value={titolo} onChange={(e) => {
                    setTitolo(e.target.value);
                    props.onChange({
                        name: e.target.value,
                        subtitle: sottotitolo,
                        dishes: dishes,
                        id: props.section.id
                    }
                    )
                }} />
            </Form.Group>
            <Form.Group className="col-12">
                <Form.Label>Sottotitolo</Form.Label>
                <Form.Control type="text" placeholder="Sottotitolo" value={sottotitolo} onChange={(e) => {
                    setSottotitolo(e.target.value);
                    props.onChange({
                        name: titolo,
                        subtitle: e.target.value,
                        dishes: dishes,
                        id: props.section.id
                    })
                }} />
            </Form.Group>
            {props.section.dishes.map((value, index) => {
                return <DishComponent key={index} dish={value} onChange={(dish) => {
                    setDishes(props.section.dishes.map((val, i) => i === index ? dish : val))
                    props.onChange({
                        name: titolo,
                        subtitle: sottotitolo,
                        dishes: props.section.dishes.map((val, i) => i === index ? dish : val),
                        id: props.section.id
                    })
                }} />
            })}

            <Card>
                <Card.Header>
                    Aggiungi Piatto
                </Card.Header>
                <Card.Body>
                    <Form.Group className="col-12">
                        <Form.Label>Nome Piatto</Form.Label>
                        <Form.Control type="text" placeholder="Titolo" value={nomePiatto} onChange={(e) => {
                            setNomePiatto(e.target.value);
                        }} />
                    </Form.Group>

                    <div className="col-12 text-right">
                        <Button type="button" variant="success" onClick={
                            () => {
                                props.onChange({
                                    name: titolo,
                                    subtitle: sottotitolo,
                                    dishes: dishes.concat({
                                        id: 0,
                                        name: nomePiatto,
                                        price: 0,
                                        description: ""
                                    }),
                                    id: props.section.id
                                })

                                setNomePiatto("");
                            }
                        }>Aggiungi Piatto</Button>
                    </div>
                </Card.Body>
            </Card>
        </Card.Body>
    </Card>
}