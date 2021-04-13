import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Citta } from "../../../model/Citta";
import { Provincia } from "../../../model/Provincia";
import { Restaurant } from "../../../model/Restaurant";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { Users } from "../../../utils/Users";

interface AddRestaurantComponentProps {
    onClickSave: OnClickSave
}

interface OnClickSave {
    (restaurant: Restaurant): void
}

export const AddRestaurantComponent: React.FunctionComponent<AddRestaurantComponentProps> = (props) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [province, setProvince] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const [provinces, setProvinces] = useState<Provincia[]>([]);
    const [cities, setCities] = useState<Citta[]>([]);


    const getProvinces = () => {
        AjaxUtils.getProvinces(Users.RISTORATORE).then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult !== "error") {
                setProvinces(ajaxResult);
            }

        })
    }

    const getCitiesByProvinceId = (id_provincia: number) => {
        AjaxUtils.getCitiesByProvinceId(Users.RISTORATORE, id_provincia).then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult !== "error") {
                setCities(ajaxResult);
            }

        })
    }

    useEffect(() => {
        getProvinces();
    }, [])

    useEffect(() => {
        getCitiesByProvinceId(parseInt(province))
    }, [province])

    return <Card>
        <Card.Header>Ristorante</Card.Header>
        <Card.Body>
            <Form.Group className="col-12">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome" value={name} onChange={(e) => {
                    setName(e.target.value);
                }} />
            </Form.Group>
            <Form.Group className="col-12">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control type="text" placeholder="Indirizzo" value={address} onChange={(e) => {
                    setAddress(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>Civico</Form.Label>
                <Form.Control type="text" placeholder="Civico" value={houseNumber} onChange={(e) => {
                    setHouseNumber(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>Provincia</Form.Label>
                <Form.Control as="select" value={province} onChange={(e) => {
                    setProvince(e.target.value)
                }}>
                    {provinces.map((value, index) => {
                        return <option key={index} value={value.id}>{value.nome} ({value.sigla})</option>
                    })}
                </Form.Control>
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>Citta</Form.Label>
                <Form.Control as="select" value={city} onChange={(e) => {
                    setCity(e.target.value);
                }}>
                    {cities.map((value, index) => {
                        return <option key={index} value={value.id}>{value.nome}</option>
                    })}
                </Form.Control>
            </Form.Group>

            <div className="col-12 text-right">
                <button className="btn btn-primary" type="submit" onClick={() => {
                    const restaurant: Restaurant = {
                        id: 0,
                        nome: name,
                        civico: houseNumber,
                        indirizzo: address,
                        id_citta: parseInt(city),
                        id_provincia: parseInt(province),
                        id_ristoratore: 0
                    }
                    props.onClickSave(restaurant)
                }}> Salva </button>

            </div>

        </Card.Body>
    </Card>
}