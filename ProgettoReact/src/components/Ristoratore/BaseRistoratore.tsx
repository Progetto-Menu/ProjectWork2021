import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { RoutesRistoratore } from "../../routes/Ristoratore";
import { strings } from "../../utils/Strings";
import { BottomNavBarComponent, BottomNavBarProps } from "../shared/BottomNavBarComponent";
import { TopBar } from "../shared/TopBar";
import { HomeRistoratore } from "./Home/HomeRistoratore";
import { PageMenu } from "./Menu/PageMenu";
import { PageProfileRistoratore } from "./Profilo/PageProfileRistoratore";

interface BaseTraduttoreProps {
    route: RoutesRistoratore
}

export const BaseRistoratore: React.FunctionComponent<BaseTraduttoreProps> = (props) => {

    const history = useHistory();
    const [page, setPage] = useState<string>("");

    useEffect(() => {
        switch (props.route) {
            case RoutesRistoratore.HOME:
                setPage(strings.home);
                break;
            case RoutesRistoratore.ADD_RESTAURANT:
                setPage(strings.add_restaurant);
                break;
            case RoutesRistoratore.ADD_MENU:
                setPage(strings.add_menu);
                break;
            case RoutesRistoratore.MENUS:
                setPage(strings.menus);
                break;
            case RoutesRistoratore.PROFILE:
                setPage(strings.profile);
                break;
            default: break;
        }
    }, [props.route])

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: strings.home,
                selected: props.route === RoutesRistoratore.HOME || props.route === RoutesRistoratore.ADD_RESTAURANT,
                onClick: () => {
                    history.replace(RoutesRistoratore.HOME);
                }
            }, {
                label: strings.menus,
                selected: props.route === RoutesRistoratore.MENUS || props.route === RoutesRistoratore.ADD_MENU,
                onClick: () => {
                    history.replace(RoutesRistoratore.MENUS);
                }
            }, {
                label: strings.profile,
                selected: props.route === RoutesRistoratore.PROFILE,
                onClick: () => {
                    history.replace(RoutesRistoratore.PROFILE);
                }
            },
        ]
    }

    return <>
        <TopBar text={page} />
        <div className="container py-5 my-5">
            {(props.route === RoutesRistoratore.HOME || props.route === RoutesRistoratore.ADD_RESTAURANT) && <HomeRistoratore route={props.route} />}
            {(props.route === RoutesRistoratore.MENUS || props.route === RoutesRistoratore.ADD_MENU) && <PageMenu route={props.route} />}
            {props.route === RoutesRistoratore.PROFILE && <PageProfileRistoratore />}
        </div>
        <BottomNavBarComponent actions={bottombarprops.actions} />

    </>
}