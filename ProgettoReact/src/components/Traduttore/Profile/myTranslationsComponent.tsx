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
                        {props.translations.length === 0 && <tr><td colSpan={4} className="text-center align-middle">Nessun Elemento Presente nella Tabella</td></tr>}
                            {props.translations.map((value, index)=>{
                                return <tr key={index}>
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
                                        {value.stato === 0 && <div className="text-black">In corso</div>}
                                        {value.stato === 1 && <div className="text-info">In fase di convalida</div>}
                                        {value.stato === 2 && <div className="text-success">Approvata</div>}
                                        {value.stato === 3 && <div className="text-danger">Scartata</div>}
                                        {value.stato === 4 && <div className="text-warning">Approvata e scartata</div>}
                                    </td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </Card.Body>
    </Card>
}