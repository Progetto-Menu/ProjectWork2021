import { useEffect, useState } from "react";
import Switch from "react-bootstrap/esm/Switch";
import { useHistory } from "react-router";
import { RoutesTraduttore } from "../../../routes/Traduttore";
import { BottomNavBarComponent, BottomNavBarProps } from "../../shared/BottomNavBarComponent";
import { TopBar } from "../../shared/TopBar";
import { HomeTraduttore } from "../Home/HomeTraduttore";
import { PageProfile } from "../Profile/pageProfile";
import { PageTranslations } from "../Translations/pageTranslations";

interface BaseTraduttoreProps {
    route: RoutesTraduttore
}

export const BaseTraduttore: React.FunctionComponent<BaseTraduttoreProps> = (props) => {

    const history = useHistory();
    const [page, setPage] = useState<string>("");

    useEffect(() => {
        switch (props.route) {
            case RoutesTraduttore.HOME:
                setPage("Home");
                break;
            case RoutesTraduttore.TRANSLATIONS:
                setPage("Translation");
                break;
            case RoutesTraduttore.PROFILE:
                setPage("Profile");
                break;
            default: break;
        }
    }, [props.route])

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: "Home",
                selected: props.route === RoutesTraduttore.HOME,
                onClick: () => {
                    history.replace(RoutesTraduttore.HOME);
                }
            }, {
                label: "Translations",
                selected: props.route === RoutesTraduttore.TRANSLATIONS,
                onClick: () => {
                    history.replace(RoutesTraduttore.TRANSLATIONS);
                }
            }, {
                label: "Profile",
                selected: props.route === RoutesTraduttore.PROFILE,
                onClick: () => {
                    history.replace(RoutesTraduttore.PROFILE);
                }
            },
        ]
    }

    return <>
        <TopBar text={page} />
        <div className="container py-5 my-5">
            {props.route === RoutesTraduttore.HOME && <HomeTraduttore />}
            {props.route === RoutesTraduttore.TRANSLATIONS && <PageTranslations />}
            {props.route === RoutesTraduttore.PROFILE && <PageProfile />}
        </div>
        <BottomNavBarComponent actions={bottombarprops.actions} />

    </>
}