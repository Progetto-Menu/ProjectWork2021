import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { RoutesRistoratore } from "../../routes/Ristoratore";
import { BottomNavBarComponent, BottomNavBarProps } from "../shared/BottomNavBarComponent";
import { TopBar } from "../shared/TopBar";
import { AddRestaurantComponent } from "./Home/AddRestaurantComponent";
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
                setPage("Home");
                break;
            case RoutesRistoratore.ADD_RESTAURANT:
                setPage("Add Restaurant");
                break;
            case RoutesRistoratore.MENUS:
                setPage("Menus");
                break;
            case RoutesRistoratore.PROFILE:
                setPage("Profile");
                break;
            default: break;
        }
    }, [props.route])

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: "Home",
                selected: props.route === RoutesRistoratore.HOME || props.route === RoutesRistoratore.ADD_RESTAURANT,
                onClick: () => {
                    history.replace(RoutesRistoratore.HOME);
                }
            }, {
                label: "Menu",
                selected: props.route === RoutesRistoratore.MENUS,
                onClick: () => {
                    history.replace(RoutesRistoratore.MENUS);
                }
            }, {
                label: "Profile",
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
            {props.route === RoutesRistoratore.MENUS && <PageMenu />}
            {props.route === RoutesRistoratore.PROFILE && <PageProfileRistoratore />}
        </div>
        <BottomNavBarComponent actions={bottombarprops.actions} />

    </>
}