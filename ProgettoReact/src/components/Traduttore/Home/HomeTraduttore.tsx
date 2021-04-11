import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { RoutesTraduttore } from '../../../routes/Traduttore';
import { AjaxUtils } from '../../../utils/AjaxUtils';
import { JSONUtils } from '../../../utils/JSONUtils';
import { StorageUtils } from '../../../utils/StorageUtils';
import { Users } from '../../../utils/Users';
import { AppRequest } from '../../App';
import { TopBar } from '../../shared/TopBar';
import { TranslationTakenOverComponent } from './translationTakenOverComponent';
import { YourTranslationToReviewComponent } from './yourTranslationToReviewComponent';
import { BottomNavBarComponent, BottomNavBarProps } from "../../shared/BottomNavBarComponent"
import { Traduttore } from '../../../model/Traduttore';
import { CustomTraduzione } from '../../../model/CustomTraduzione';
import { Button, Modal } from 'react-bootstrap';


export const HomeTraduttore: React.FunctionComponent = () => {

    const [translationsTakenOver, setTranslationsTakenOver] = useState<CustomTraduzione[]>([]);
    const [translationsToReview, setTranslationsToReview] = useState<CustomTraduzione[]>([]);

    const getAllTranslationsInProgress = () => {
        AjaxUtils.getAllTranslationsInProgress().then((result) => {
            setTranslationsTakenOver(result.data);
        }).catch((error) => {

        })
    }

    const getTranslationsToReview = () => {
        AjaxUtils.getTranslationsToReview().then((result) => {
            setTranslationsToReview(result.data);
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