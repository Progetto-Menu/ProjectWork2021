import React from "react";
import {PostProp} from "./interfaces";
import "./styles/app.css";

export const PostComponent: React.FunctionComponent<PostProp> = (prop) => {
    return <div className="box">
        {prop.titolo}
        <br/>
        Autore: {prop.autore}
        <div className="contenuto">
            {prop.contenuto}
        </div>
        Data: {prop.data.toString()}
    </div>
}