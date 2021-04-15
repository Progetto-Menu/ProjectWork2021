import React, { useEffect, useState } from 'react';
import { CustomTraduzione } from '../../../model/CustomTraduzione';
import { AjaxUtils } from '../../../utils/AjaxUtils';
import { JSONUtils } from '../../../utils/JSONUtils';
import { TranslationTakenOverComponent } from './translationTakenOverComponent';
import { YourTranslationToReviewComponent } from './yourTranslationToReviewComponent';


export const HomeTraduttore: React.FunctionComponent = () => {

    const [translationsTakenOver, setTranslationsTakenOver] = useState<CustomTraduzione[]>([]);
    const [translationsToReview, setTranslationsToReview] = useState<CustomTraduzione[]>([]);

    const getAllTranslationsInProgress = () => {
        AjaxUtils.getAllTranslationsInProgress().then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if(ajaxResult !== "error"){
                setTranslationsTakenOver(ajaxResult);
            }
        }).catch((error) => {

        })
    }

    const getTranslationsToReview = () => {
        AjaxUtils.getTranslationsToReview().then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if(ajaxResult !== "error"){
                setTranslationsToReview(ajaxResult);
            }
        }).catch((error) => {

        })
    }

    const sendTranslation = (id: number, text:string)=>{
        AjaxUtils.sendTranslation(id, text).then((result) => {
            const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
            if (resultAjax === "OK") {
                getAllTranslationsInProgress();
            }
        }).catch(() => {

        })
    }

    const approveTranslation = (translation: CustomTraduzione) =>{
        AjaxUtils.approveTranslation(translation.id).then((result) => {
            const resultAjax = JSONUtils.getProperty(result.data, "result", "error");
            if (resultAjax === "OK") {
                getTranslationsToReview();
            }
        }).catch(() => {

        })
    }

    const discardTranslation = (translation: CustomTraduzione) =>{
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
        getTranslationsToReview();
    }, [])

    return <>
        <TranslationTakenOverComponent translations={translationsTakenOver} onClickSend={sendTranslation} />
        <br></br>
        <YourTranslationToReviewComponent translations={translationsToReview} onClickApprove={approveTranslation} onClickDiscard={discardTranslation} />
    </>
}