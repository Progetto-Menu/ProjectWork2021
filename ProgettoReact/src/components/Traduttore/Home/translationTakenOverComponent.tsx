import React, { useEffect, useState } from 'react';
import { Button, Card } from "react-bootstrap";
import { CustomTraduzione } from "../../../model/CustomTraduzione";
import { strings } from "../../../utils/Strings";

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
            {strings.translation_in_progress}
    </Card.Header>
        <Card.Body>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>{strings.text}</th>
                            <th>{strings.translation_language}</th>
                            <th>{strings.translated_text}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.translations.length === 0 && <tr><td colSpan={4} className="text-center align-middle">{strings.no_elements_prensent_in_the_table}</td></tr>}
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
                                    <Button variant="success" onClick={() => props.onClickSend(value.id, translatedTexts[index])}>{strings.submit}</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </Card.Body>
    </Card>
}