import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Traduttore } from "../../model/Traduttore";
import { RoutesAmministratore } from "../../routes/Amministratore";
import { AjaxUtils } from "../../utils/AjaxUtils";
import { JSONUtils } from "../../utils/JSONUtils";
import { StorageUtils } from "../../utils/StorageUtils";
import { strings } from "../../utils/Strings";
import { BottomNavBarComponent, BottomNavBarProps } from "../shared/BottomNavBarComponent";
import { TopBar } from "../shared/TopBar";

interface HomeUtenteProps {
    route: RoutesAmministratore
    onClickLogout: OnClickLogout
}

interface OnClickLogout {
    (): void
}

export const HomeAmministratore: React.FunctionComponent<HomeUtenteProps> = (props) => {

    const history = useHistory();
    const [page, setPage] = useState<string>("");
    const [traduttoreNonRevisori, setTraduttoriNonRevisori] = useState<Traduttore[]>([]);

    const getTraduttoriNonRevisori = () => {
        AjaxUtils.getTranslatorsNotRevisers().then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult !== "error") {
                const array: Traduttore[] = [];
                for (let i = 0; i < ajaxResult.length; i++) {
                    array.push({
                        id: JSONUtils.getProperty(ajaxResult[i], "id", 0),
                        name: JSONUtils.getProperty(ajaxResult[i], "nome", ""),
                        surname: JSONUtils.getProperty(ajaxResult[i], "cognome", ""),
                        email: JSONUtils.getProperty(ajaxResult[i], "email", ""),
                        nToken: 0,
                        reviewTranslations: [],
                        takenTranslations: []
                    })
                }
                setTraduttoriNonRevisori(array);
            }
        })
    }

    const promuoviTraduttore = (traduttore: Traduttore) => {
        if(traduttore.id == null || traduttore.id === 0) return;
        AjaxUtils.promoteTranslator(traduttore).then((result)=>{
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if (ajaxResult === "OK") {
                getTraduttoriNonRevisori();
            }
        })
    }

    useEffect(() => {
        getTraduttoriNonRevisori();
    }, [])

    useEffect(() => {
        switch (props.route) {
            case RoutesAmministratore.HOME:
                setPage(strings.home);
                break;
            case RoutesAmministratore.LOGOUT:
                setPage(strings.logout);
                break;
            default: break;
        }
    }, [props.route])

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: strings.home,
                selected: props.route === RoutesAmministratore.HOME,
                onClick: () => {
                    history.replace(RoutesAmministratore.HOME);
                }
            }, {
                label: strings.logout,
                selected: props.route === RoutesAmministratore.LOGOUT,
                onClick: () => {
                    StorageUtils.remove(StorageUtils.token_key);
                    props.onClickLogout();
                }
            }
        ]
    }


    return <><TopBar text={page} />
        {props.route === RoutesAmministratore.HOME && <div className="container py-5 my-5">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>
                                {strings.your_personal_data_name}
                            </th>
                            <th>
                                {strings.your_personal_data_surname}
                            </th>
                            <th>
                                {strings.your_personal_data_email}
                            </th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {traduttoreNonRevisori.map((value, index)=>{
                            return <tr key={index}>
                                <td className="align-middle">{value.name}</td>
                                <td className="align-middle">{value.surname}</td>
                                <td className="align-middle">{value.email}</td>
                                <td className="align-middle text-center"><Button variant="primary" onClick={()=>{
                                    promuoviTraduttore(value)
                                }}>
                                        {strings.promote}
                                    </Button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>}

        <BottomNavBarComponent actions={bottombarprops.actions} /></>
}