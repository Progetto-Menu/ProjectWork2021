import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { CustomTraduzione } from '../../../model/CustomTraduzione';
import { Traduttore } from '../../../model/Traduttore';

interface MyTranslationsProps{
    translations: CustomTraduzione[]
}

export const MyTranslationsComponent: React.FunctionComponent<MyTranslationsProps> = (props) => {

    return <Card>
        <Card.Header>
            Le mie traduzioni
        </Card.Header>
        <Card.Body>
            <div className="table-responsive">
                <table className="table table-bordered"> 
                    <thead>
                        <tr>
                            <th>Testo</th>
                            <th>Testo Tradotto</th>
                            <th>Lingua di Traduzione</th>
                            <th>Stato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.translations.length === 0 && <tr><td colSpan={4}>Nessun Elemento presente nella tabella</td></tr>}
                            {props.translations.map((value, index)=>{
                                return <tr>
                                    <td>
                                        {value.testo}
                                    </td>
                                    <td>
                                        {value.testoTradotto}
                                    </td>
                                    <td>
                                        {value.codLingua.toUpperCase()}
                                    </td>
                                    <td>
                                        {value.stato}
                                    </td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </Card.Body>
    </Card>
}