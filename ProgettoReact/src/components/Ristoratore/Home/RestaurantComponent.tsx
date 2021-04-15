import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Citta } from "../../../model/Citta";
import { Provincia } from "../../../model/Provincia";
import { Restaurant } from "../../../model/Restaurant";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { strings } from "../../../utils/Strings";
import { Users } from "../../../utils/Users";

interface RestaurantComponentProps {
    restaurant: Restaurant
    onClickSave: OnClick
    onClickDelete: OnClick
}

interface OnClick {
    (restaurant: Restaurant): void
}

export const RestaurantComponent: React.FunctionComponent<RestaurantComponentProps> = (props) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [id, setId] = useState(props.restaurant.id);
    const [name, setName] = useState(props.restaurant.nome);
    const [address, setAddress] = useState(props.restaurant.indirizzo);
    const [houseNumber, setHouseNumber] = useState(props.restaurant.civico);
    const [province, setProvince] = useState<string>(props.restaurant.id_provincia.toString());
    const [city, setCity] = useState<string>(props.restaurant.id_citta.toString());

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

    useEffect(() => {
        setId(props.restaurant.id)
        setName(props.restaurant.nome);
        setAddress(props.restaurant.indirizzo);
        setHouseNumber(props.restaurant.civico);
        setProvince(props.restaurant.id_provincia.toString());
        setCity(props.restaurant.id_citta.toString());
    }, [props.restaurant])

    return <Card className="my-3">
        <Card.Header>{strings.restaurant}</Card.Header>
        <Card.Body>
            <Form.Group className="col-12">
                <Form.Label>{strings.name}</Form.Label>
                <Form.Control type="text" placeholder={strings.name} readOnly={!isEditing} value={name} onChange={(e) => {
                    setName(e.target.value);
                }} />
            </Form.Group>
            <Form.Group className="col-12">
                <Form.Label>{strings.address}</Form.Label>
                <Form.Control type="text" placeholder={strings.address} readOnly={!isEditing} value={address} onChange={(e) => {
                    setAddress(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>{strings.street_number}</Form.Label>
                <Form.Control type="text" placeholder={strings.street_number} readOnly={!isEditing} value={houseNumber} onChange={(e) => {
                    setHouseNumber(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>{strings.province}</Form.Label>
                <Form.Control as="select" readOnly={!isEditing} disabled={!isEditing} value={province} onChange={(e) => {
                    setProvince(e.target.value)
                }}>
                    {provinces.map((value, index) => {
                        return <option key={index} value={value.id}>{value.nome} ({value.sigla})</option>
                    })}
                </Form.Control>
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>{strings.city}</Form.Label>
                <Form.Control as="select" readOnly={!isEditing} disabled={!isEditing} value={city} onChange={(e) => {
                    setCity(e.target.value);
                }}>
                    {cities.map((value, index) => {
                        return <option key={index} value={value.id}>{value.nome}</option>
                    })}
                </Form.Control>
            </Form.Group>

            <div className="col-12 text-right">
                {!isEditing && <button className="btn btn-danger mr-2" type="button" onClick={() => {
                    props.onClickDelete({
                        civico: houseNumber,
                        indirizzo: address,
                        id: id,
                        id_citta: parseInt(city),
                        id_provincia: parseInt(province),
                        id_ristoratore: 0,
                        nome: name
                    })
                }}> {strings.remove} </button>}

                <button className="btn btn-primary" type="button" onClick={() => {
                    if (isEditing) {
                        props.onClickSave({
                            civico: houseNumber,
                            indirizzo: address,
                            id: id,
                            id_citta: parseInt(city),
                            id_provincia: parseInt(province),
                            id_ristoratore: 0,
                            nome: name
                        })
                        setIsEditing(false)
                    }
                    else {
                        setIsEditing(true);
                    }
                }}> {isEditing ? <>{strings.save}</> : <>{strings.edit}</>}  </button>

            </div>

        </Card.Body>
    </Card>
}