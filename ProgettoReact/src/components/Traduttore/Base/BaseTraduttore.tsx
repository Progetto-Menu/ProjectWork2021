import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { RoutesTraduttore } from "../../../routes/Traduttore";
import { strings } from "../../../utils/Strings";
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
                setPage(strings.home);
                break;
            case RoutesTraduttore.TRANSLATIONS:
                setPage(strings.translations);
                break;
            case RoutesTraduttore.PROFILE:
                setPage(strings.profile);
                break;
            default: break;
        }
    }, [props.route])

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: strings.home,
                selected: props.route === RoutesTraduttore.HOME,
                onClick: () => {
                    history.replace(RoutesTraduttore.HOME);
                }
            }, {
                label: strings.translations,
                selected: props.route === RoutesTraduttore.TRANSLATIONS,
                onClick: () => {
                    history.replace(RoutesTraduttore.TRANSLATIONS);
                }
            }, {
                label: strings.profile,
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