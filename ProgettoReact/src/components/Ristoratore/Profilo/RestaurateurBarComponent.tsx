import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Ristoratore } from '../../../model/Ristoratore';
import { AjaxUtils } from '../../../utils/AjaxUtils';
import { JSONUtils } from '../../../utils/JSONUtils';
import { strings } from '../../../utils/Strings';
import { Users } from '../../../utils/Users';

interface UserBarComponentProps {
    user: Ristoratore
}

export const RestaurateurBarComponent: React.FunctionComponent<UserBarComponentProps> = (prop) => {

    const [nome, setNome] = useState(prop.user.name);
    const [cognome, setCognome] = useState(prop.user.surname);
    const [email, setEmail] = useState(prop.user.email);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setNome(prop.user.name);
        setCognome(prop.user.surname);
        setEmail(prop.user.email);
    }, [prop.user])

    return <React.Fragment>

        <Card>
            <Card.Header>
                {strings.your_personal_data}
            </Card.Header>
            <Card.Body>
                <Form.Group className="col-12">
                    <Form.Label>{strings.your_personal_data_name}</Form.Label>
                    <Form.Control type="text" placeholder={strings.your_personal_data_name} readOnly={!isEditing} value={nome} onChange={(e) => {
                        setNome(e.target.value);
                    }} />
                </Form.Group>

                <Form.Group className="col-12">
                    <Form.Label>{strings.your_personal_data_surname}</Form.Label>
                    <Form.Control type="text" placeholder={strings.your_personal_data_surname} readOnly={!isEditing} value={cognome} onChange={(e) => {
                        setCognome(e.target.value);
                    }} />
                </Form.Group>

                <Form.Group className="col-12">
                    <Form.Label>{strings.your_personal_data_email}</Form.Label>
                    <Form.Control type="text" placeholder={strings.your_personal_data_email} readOnly value={email} />
                </Form.Group>

                <div className="col-12 text-right">
                    <button className="btn btn-primary" type="button" onClick={() => {
                        if (isEditing) {
                            AjaxUtils.updateUser(Users.TRADUTTORE, nome, cognome).then((result) => {
                                const resultRequest = JSONUtils.getProperty(result.data, "result", "error");
                                if (resultRequest === "error") {
                                    console.log("non aggiornato")
                                }
                                else {
                                    const ajaxNome = JSONUtils.getProperty(resultRequest, "nome", "");
                                    const ajaxCognome = JSONUtils.getProperty(resultRequest, "cognome", "");
                                    setNome(ajaxNome);
                                    setCognome(ajaxCognome);
                                }
                            }).catch(() => {

                            }).finally(() => {
                                setIsEditing(false);
                            })
                        }
                        else{
                            setIsEditing(true);
                        }
                    }}> {isEditing ? <>{strings.save}</> : <>{strings.edit}</>}  </button>

                </div>
            </Card.Body>

        </Card>
    </React.Fragment>
}