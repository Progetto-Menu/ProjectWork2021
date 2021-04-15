import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Ristoratore } from "../../../model/Ristoratore";
import { RoutesRistoratore } from "../../../routes/Ristoratore";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { StorageUtils } from "../../../utils/StorageUtils";
import { strings } from "../../../utils/Strings";
import { Users } from "../../../utils/Users";
import { RestaurateurBarComponent } from "./RestaurateurBarComponent";

export const PageProfileRistoratore : React.FunctionComponent = ()=>{

    const [user, setUser] = useState<Ristoratore>({
        email: "",
        name: "",
        surname: ""
    });


    const history = useHistory();


    const getUser = () => {
        AjaxUtils.getUser(Users.RISTORATORE).then((result) => {
            const nome: string = JSONUtils.getProperty(result.data, "nome", "");
            const cognome: string = JSONUtils.getProperty(result.data, "cognome", "");
            const email: string = JSONUtils.getProperty(result.data, "email", "");
            const u: Ristoratore = {
                email: email,
                name: nome,
                surname: cognome
            }

            setUser(u)
        })
    }


    const logout = () => {
        StorageUtils.remove(StorageUtils.token_key);
        history.replace(RoutesRistoratore.LOGIN);
    }



    useEffect(() => {
        getUser();
    }, [])


    return <>
        <div className="row mt-5">
            <div className="col-12">
                <RestaurateurBarComponent user={user} />
            </div>
        </div>

        <div className="row my-5">
            <div className="col-12 text-center">
                <button className="btn btn-primary w-100" onClick={logout}>{strings.logout}</button>
            </div>
        </div>
    </>
}