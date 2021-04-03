import React, { Component } from 'react';
import { UserProp } from '../Prop/userProp';

export const UserBarComponent: React.FunctionComponent<UserProp> = (prop) => {

    return <React.Fragment>
        <div className="bg-white w-50 mx-auto rounded border border-secondary text-warning">
        {prop.name} 
        {prop.surname}
        n. Token
        {prop.nToken}
     </div>
    </React.Fragment>
}