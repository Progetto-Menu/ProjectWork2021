import React, { Component, useState } from 'react';

export const NewSectionComponent: React.FunctionComponent = () => {

    let [sectionNameValue, setSectionNameValue] = useState<string>("");

    return <React.Fragment>
        Section name:
        <input type="text" value={sectionNameValue} onChange={(event) => {
            let val = event.target.value;
            console.log(val);
            setSectionNameValue(val);
        }} />
    </React.Fragment>
}