import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Language } from '../Prop/menuProp';
import { UserProp } from '../Prop/userProp';

interface YourLanguagesProps{
    allLanguages: Language[]
}

export const YourLanguagesComponent: React.FunctionComponent<YourLanguagesProps> = (props) => {

    return <React.Fragment>
        <Card>
            <Card.Header>
                Le tue Lingue
            </Card.Header>
            <Card.Body>
                <Form.Group className="col-12">
                    <Form.Label>Lingue</Form.Label>
                    <Form.Control as="select">
                        {props.allLanguages.map((value, index)=>{
                            return <option key={index} value={value.id}>{value.name}</option>
                        })}
                    </Form.Control>
                </Form.Group>
                <div className="col-12 text-right mb-3">
                    <Button variant="success">Aggiungi</Button>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr><th>Lingue</th>
                                <th>Codice</th>
                                <th>Rimuovi</th></tr>

                        </thead>
                        <tbody>
                            
                            <tr>
                                <td>Italiano</td>
                                <td>it-IT</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
    </React.Fragment>
}