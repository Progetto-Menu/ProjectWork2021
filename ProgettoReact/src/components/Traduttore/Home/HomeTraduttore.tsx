import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { CustomTraduzione } from '../../../model/CustomTraduzione';
import { AjaxUtils } from '../../../utils/AjaxUtils';
import { JSONUtils } from '../../../utils/JSONUtils';
import { strings } from '../../../utils/Strings';
import { Users } from '../../../utils/Users';
import { TranslationTakenOverComponent } from './translationTakenOverComponent';
import { YourTranslationToReviewComponent } from './yourTranslationToReviewComponent';


export const HomeTraduttore: React.FunctionComponent = () => {

    const [translationsTakenOver, setTranslationsTakenOver] = useState<CustomTraduzione[]>([]);
    const [translationsToReview, setTranslationsToReview] = useState<CustomTraduzione[]>([]);
    const [isRevisore, setIsRevisore] = useState<boolean>(false);

    const getAllTranslationsInProgress = () => {
        AjaxUtils.getAllTranslationsInProgress().then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult !== "error") {
                setTranslationsTakenOver(ajaxResult);
            }
        }).catch((error) => {

        })
    }

    const getTranslationsToReview = () => {
        AjaxUtils.getTranslationsToReview().then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult !== "error") {
                setTranslationsToReview(ajaxResult);
            }
        }).catch((error) => {

        })
    }

    const sendTranslation = (id: number, text: string) => {
        AjaxUtils.sendTranslation(id, text).then((result) => {
            const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
            if (resultAjax === "OK") {
                getAllTranslationsInProgress();
            }
        }).catch(() => {

        })
    }

    const approveTranslation = (translation: CustomTraduzione) => {
        AjaxUtils.approveTranslation(translation.id).then((result) => {
            const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
            if (resultAjax === "OK") {
                getTranslationsToReview();
            }
        }).catch(() => {

        })
    }

    const discardTranslation = (translation: CustomTraduzione) => {
        AjaxUtils.discardTranslation(translation.id).then((result) => {
            const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
            if (resultAjax === "OK") {
                getTranslationsToReview();
            }
        }).catch(() => {

        })
    }

    useEffect(() => {
        getAllTranslationsInProgress();
        AjaxUtils.getUser(Users.TRADUTTORE).then((result) => {
            const resultAjax = JSONUtils.getProperty(result.data, "revisore", 0);
            if (resultAjax === 1) {
                setIsRevisore(true);
                getTranslationsToReview();
            }
        }).catch(() => {

        })
    }, [])

    return <>
        <TranslationTakenOverComponent translations={translationsTakenOver} onClickSend={sendTranslation} />
        <br></br>
        { isRevisore && <>
            <YourTranslationToReviewComponent translations={translationsToReview} onClickApprove={approveTranslation} onClickDiscard={discardTranslation} />
        </>}
        { !isRevisore && <Card bg="light">
            <Card.Body className="text-center">
                {strings.your_are_not_a_revisor}
            </Card.Body>
        </Card>}

    </>
}