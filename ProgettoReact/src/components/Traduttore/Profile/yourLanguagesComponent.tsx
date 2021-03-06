import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Language } from '../../../model/Language';
import { AjaxUtils } from '../../../utils/AjaxUtils';
import { JSONUtils } from '../../../utils/JSONUtils';
import { strings } from '../../../utils/Strings';

interface YourLanguagesProps {
    knownLanguages: Language[],
    unKnownLanguages: Language[],
    onClickAdd: OnClickAdd
    onClickRemove: OnClickRemove
}

interface OnClickAdd {
    (): void
}

interface OnClickRemove {
    (): void
}

export const YourLanguagesComponent: React.FunctionComponent<YourLanguagesProps> = (props) => {

    const [selectedElement, setSelectedElement] = useState<number>(-1);

    useEffect(()=>{
        setSelectedElement(-1);
    }, [props.unKnownLanguages, props.knownLanguages])
    return <React.Fragment>
        <Card>
            <Card.Header>
                {strings.your_languages}
            </Card.Header>
            <Card.Body>
                <Form.Group className="col-12">
                    <Form.Label>{strings.languages}</Form.Label>
                    <Form.Control as="select" onChange={(e) => {
                        setSelectedElement(parseInt(e.target.value));
                    }}>
                        {props.unKnownLanguages.map((value, index) => {
                            if(index === 0 && selectedElement === -1) setSelectedElement(value.id);
                            if (selectedElement === value.id) {
                                return <option key={index} value={value.id} selected>{value.name}</option>
                            }
                            else {
                                return <option key={index} value={value.id}>{value.name}</option>
                            }

                        })}
                    </Form.Control>
                </Form.Group>
                <div className="col-12 text-right mb-3">
                    <Button variant="success" onClick={
                        () => {
                            AjaxUtils.setLanguageForTranslator(selectedElement).then((result) => {
                                const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
                                if(resultAjax === "OK") props.onClickAdd();
                            }).catch(() => {

                            })
                        }
                    }>{strings.add}</Button>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">{strings.your_languages_language_column}</th>
                                <th className="text-center">{strings.your_languages_code_column}</th>
                                <th className="text-center">{strings.your_languages_remove_column}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.knownLanguages.length === 0 && <tr><td colSpan={3} className="text-center align-middle">{strings.no_elements_prensent_in_the_table}</td></tr>}
                            {props.knownLanguages.map((value, index) => {
                                return <tr key={index}>
                                    <td className="text-center align-middle">{value.name}</td>
                                    <td className="text-center align-middle">{value.sign}</td>
                                    <td className="text-center align-middle"><Button variant="danger" onClick={()=>{
                                        AjaxUtils.removeLanguageForTranslator(value.id).then((result)=>{
                                            const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
                                            if(resultAjax === "OK") props.onClickRemove();
                                        }).catch(()=>{

                                        })
                                    }}>{strings.remove}</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
    </React.Fragment>
}