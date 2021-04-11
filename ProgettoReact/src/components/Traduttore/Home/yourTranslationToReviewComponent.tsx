import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuToReviewHomeComponent } from "./menuToReviewHomeComponent";
import { Traduttore } from "../../../model/Traduttore";
import { Button, Card } from "react-bootstrap";
import { CustomTraduzione } from "../../../model/CustomTraduzione";


interface YourTranslationToReviewProps {
    translations: CustomTraduzione[]
    onClickApprove: OnClickApprove
    onClickDiscard: OnClickDiscard
}

interface OnClickApprove{
    (translation: CustomTraduzione): void
}

interface OnClickDiscard{
    (translation: CustomTraduzione): void
}

export const YourTranslationToReviewComponent: React.FunctionComponent<YourTranslationToReviewProps> = (props) => {
    return <Card>
        <Card.Header>
            Traduzioni da revisionare
        </Card.Header>
        <Card.Body>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Testo</th>
                            <th>Lingua di Traduzione</th>
                            <th>Testo Tradotto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.translations.length === 0 && <tr><td colSpan={4} className="text-center align-middle">Nessun Elemento Presente nella Tabella</td></tr>}
                        {props.translations.map((value, index) => {
                            return <tr>
                                <td className="align-middle">
                                    {value.testo}
                                </td>
                                <td className="align-middle">
                                    {value.codLingua.toUpperCase()}
                                </td>
                                <td className="align-middle">
                                    {value.testoTradotto}
                                </td>
                                <td className="align-middle text-center">
                                    <Button variant="success" className="mr-2" onClick={()=> props.onClickApprove(value)}>Approva</Button>
                                    <Button variant="danger" onClick={()=>props.onClickDiscard(value)}>Scarta</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </Card.Body>
    </Card>
}