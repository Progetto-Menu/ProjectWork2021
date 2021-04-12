import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { RoutesRistoratore } from "../../routes/Ristoratore";
import { BottomNavBarComponent, BottomNavBarProps } from "../shared/BottomNavBarComponent";
import { TopBar } from "../shared/TopBar";
import { HomeRistoratore } from "./Home/HomeRistoratore";
import { PageMenu } from "./Menu/PageMenu";
import { PageProfileRistoratore } from "./Profilo/PageProfileRistoratore";
import { PageRestaurants } from "./Ristoranti/PageRestaurants";

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
            case RoutesRistoratore.RESTAURANTS:
                setPage("Restaurants");
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
                selected: props.route === RoutesRistoratore.HOME,
                onClick: () => {
                    history.replace(RoutesRistoratore.HOME);
                }
            }, {
                label: "Restaurants",
                selected: props.route === RoutesRistoratore.RESTAURANTS,
                onClick: () => {
                    history.replace(RoutesRistoratore.RESTAURANTS);
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
            {props.route === RoutesRistoratore.HOME && <HomeRistoratore />}
            {props.route === RoutesRistoratore.RESTAURANTS && <PageRestaurants />}
            {props.route === RoutesRistoratore.MENUS && <PageMenu />}
            {props.route === RoutesRistoratore.PROFILE && <PageProfileRistoratore />}
        </div>
        <BottomNavBarComponent actions={bottombarprops.actions} />

    </>
}