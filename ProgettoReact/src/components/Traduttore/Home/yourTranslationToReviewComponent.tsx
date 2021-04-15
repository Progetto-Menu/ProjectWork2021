import React from 'react';
import { Button, Card } from "react-bootstrap";
import { CustomTraduzione } from "../../../model/CustomTraduzione";
import { strings } from "../../../utils/Strings";


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
           {strings.translation_to_review}
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
                                    <Button variant="success" className="mr-2" onClick={()=> props.onClickApprove(value)}>{strings.approve}</Button>
                                    <Button variant="danger" onClick={()=>props.onClickDiscard(value)}>{strings.discard}</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </Card.Body>
    </Card>
}