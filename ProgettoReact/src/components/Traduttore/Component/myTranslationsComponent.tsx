import React, { Component } from 'react';
import { UserProp } from '../Prop/userProp';

export const MyTranslationsComponent: React.FunctionComponent<UserProp> = (prop) => {

    return <React.Fragment>
        <button className="bg-white w-50 mx-auto rounded border border-secondary text-warning">
        My Translations
     </button>
    </React.Fragment>
}