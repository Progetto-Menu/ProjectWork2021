import ReactDOM from "react-dom";
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Traduttore } from "../../../model/Traduttore";
import { CustomTraduzione } from "../../../model/CustomTraduzione";
import { Button, Card, Form } from "react-bootstrap";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";

interface TranslationTakenOverProps {
    translations: CustomTraduzione[]
    onClickSend: OnClickSend
}

interface OnClickSend {
    (id: number, text: string): void
}


export const TranslationTakenOverComponent: React.FunctionComponent<TranslationTakenOverProps> = (props) => {
    const [translatedTexts, setTranslatedTexts] = useState<string[]>([]);

    useEffect(()=>{
        const array: string[] = [];
        for(let i=0; i<props.translations.length; i++)array.push("");
        setTranslatedTexts(array)
    },[props.translations])
    return <Card>
        <Card.Header>
            Traduzioni in carico
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
                            return <tr key={index}>
                                <td className="align-middle">
                                    {value.testo}
                                </td>
                                <td className="align-middle">
                                    {value.codLingua.toUpperCase()}
                                </td>
                                <td className="align-middle">
                                    <textarea className="form-control" value={translatedTexts[index]} defaultValue={translatedTexts[index]} rows={5} style={{ resize: "none" }} onChange={(e)=>{
                                        const array: string[] = [];
                                        translatedTexts.map((val, i) => i === index ? array.push(e.target.value) : val);
                                        setTranslatedTexts(array);
                                    }}></textarea>
                                </td>
                                <td className="text-center align-middle">
                                    <Button variant="success" onClick={() => props.onClickSend(value.id, translatedTexts[index])}>Invia</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </Card.Body>
    </Card>
}