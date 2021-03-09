import { useState } from "react";
import { PostProp } from "./interfaces";
import { CreatePostComponentProps} from "./interfaces";

export const CreatePostComponent: React.FunctionComponent<CreatePostComponentProps> = (props) => {
    let [titoloValue, setTitoloValue] = useState<string>("");
    let [contenutoValue, setContenutoValue] = useState<string>("");
    let [autoreValue, setAutoreValue] = useState<string>("");

    return <div>
        Titolo:
        <input type="text" value={titoloValue} onChange={(event) => {
             let valoreInputato = event.target.value;
             console.log(valoreInputato);
             setTitoloValue(valoreInputato);
        }} />
        Contenuto:
        <input type="text" value={contenutoValue} onChange={(event) => {
             let valoreInputato = event.target.value;
             console.log(valoreInputato);
             setContenutoValue(valoreInputato);
        }} />
        Autore:
        <input type="text" value={autoreValue} onChange={(event) => {
             let valoreInputato = event.target.value;
             console.log(valoreInputato);
             setAutoreValue(valoreInputato);
        }} />
        <button onClick={() => {
            let nuovoPost: PostProp = {
                titolo : titoloValue,
                contenuto: contenutoValue,
                autore: autoreValue,
                data: new Date(),
            };
            props.callback(nuovoPost);
        }}>Crea</button>
    </div>;
};