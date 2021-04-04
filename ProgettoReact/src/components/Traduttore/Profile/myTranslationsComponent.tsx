import React, { Component } from 'react';
import { Traduttore } from '../../../model/Traduttore';

export const MyTranslationsComponent: React.FunctionComponent<Traduttore> = (prop) => {

    return <React.Fragment>
        <button className="bg-white w-50 mx-auto rounded border border-secondary text-warning">
        My Translations
     </button>
    </React.Fragment>
}