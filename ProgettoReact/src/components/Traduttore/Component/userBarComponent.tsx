import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { UserProp } from '../Prop/userProp';

export const UserBarComponent: React.FunctionComponent<UserProp> = (prop) => {

    const [nome, setNome] = useState(prop.name);
    const [cognome, setCognome] = useState(prop.surname);
    const [token, setToken] = useState(prop.nToken);
    const [isEditing, setIsEditing] = useState(true);

    return <React.Fragment>
        <div className="rounded border border-secondary p-5">
            <h3 className="text-center mb-3">I tuoi dati</h3>
            <Form.Group className="col-12">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome" readOnly={isEditing} value={nome} onChange={(e) => {
                    setNome(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>Cognome</Form.Label>
                <Form.Control type="text" placeholder="Nome" readOnly={isEditing} value={cognome} onChange={(e) => {
                    setCognome(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="col-12">
                <Form.Label>N. Token</Form.Label>
                <Form.Control type="text" placeholder="Nome" readOnly value={token} />
            </Form.Group>

            <div className="col-12 text-right">
                <button className="btn btn-primary" type="submit" onClick={() => {
                    setIsEditing(!isEditing)
                }}> {!isEditing ? <>Salva</> : <>Modifica</>}  </button>

            </div>


        </div>
    </React.Fragment>
}