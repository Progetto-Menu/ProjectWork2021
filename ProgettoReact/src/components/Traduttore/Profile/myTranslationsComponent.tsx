import React from 'react';
import { Card } from 'react-bootstrap';
import { CustomTraduzione } from '../../../model/CustomTraduzione';
import { strings } from '../../../utils/Strings';

interface MyTranslationsProps{
    translations: CustomTraduzione[]
}

export const MyTranslationsComponent: React.FunctionComponent<MyTranslationsProps> = (props) => {

    return <Card>
        <Card.Header>
            {strings.your_translations}
        </Card.Header>
        <Card.Body>
            <div className="table-responsive">
                <table className="table table-bordered"> 
                    <thead>
                        <tr>
                            <th>{strings.text}</th>
                            <th>{strings.translated_text}</th>
                            <th>{strings.translation_language}</th>
                            <th>{strings.your_translations_status_column}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.translations.length === 0 && <tr><td colSpan={4} className="text-center align-middle">{strings.no_elements_prensent_in_the_table}</td></tr>}
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
                                        {value.stato === 0 && <div className="text-black">{strings.status_in_progress}</div>}
                                        {value.stato === 1 && <div className="text-info">{strings.status_validation}</div>}
                                        {value.stato === 2 && <div className="text-success">{strings.status_approved}</div>}
                                        {value.stato === 3 && <div className="text-danger">{strings.status_discarded}</div>}
                                        {value.stato === 4 && <div className="text-warning">{strings.status_approved_and_discarded}</div>}
                                    </td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </Card.Body>
    </Card>
}