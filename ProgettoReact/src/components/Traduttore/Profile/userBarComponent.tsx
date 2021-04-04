import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Traduttore } from '../../../model/Traduttore';
import { AjaxUtils } from '../../../utils/AjaxUtils';
import { JSONUtils } from '../../../utils/JSONUtils';
import { Users } from '../../../utils/Users';

interface UserBarComponentProps {
    user: Traduttore
}

export const UserBarComponent: React.FunctionComponent<UserBarComponentProps> = (prop) => {

    const [nome, setNome] = useState(prop.user.name);
    const [cognome, setCognome] = useState(prop.user.surname);
    const [email, setEmail] = useState(prop.user.email);
    const [token, setToken] = useState(prop.user.nToken);
    const [isEditing, setIsEditing] = useState(true);

    useEffect(() => {
        setNome(prop.user.name);
        setCognome(prop.user.surname);
        setEmail(prop.user.email);
        setToken(prop.user.nToken);
    }, [prop.user])

    return <React.Fragment>

        <Card>
            <Card.Header>
                I tuoi dati
            </Card.Header>
            <Card.Body>
                <Form.Group className="col-12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome" readOnly={isEditing} value={nome} onChange={(e) => {
                        setNome(e.target.value);
                    }} />
                </Form.Group>

                <Form.Group className="col-12">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" placeholder="Cognome" readOnly={isEditing} value={cognome} onChange={(e) => {
                        setCognome(e.target.value);
                    }} />
                </Form.Group>

                <Form.Group className="col-12">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" readOnly value={email} />
                </Form.Group>

                <Form.Group className="col-12">
                    <Form.Label>N. Token</Form.Label>
                    <Form.Control type="text" placeholder="Nome" readOnly value={token} />
                </Form.Group>

                <div className="col-12 text-right">
                    <button className="btn btn-primary" type="submit" onClick={() => {
                        if (isEditing) {
                            AjaxUtils.updateUser(Users.TRADUTTORE, nome, cognome).then((result) => {
                                const resultRequest = JSONUtils.getProperty(result.data, "result", "error");
                                if (resultRequest === "OK") {

                                }
                                else {

                                }
                            }).catch(() => {

                            }).finally(() => {
                                setIsEditing(false);
                            })
                        }
                        else{
                            setIsEditing(true);
                        }
                    }}> {!isEditing ? <>Salva</> : <>Modifica</>}  </button>

                </div>
            </Card.Body>

        </Card>
    </React.Fragment>
}