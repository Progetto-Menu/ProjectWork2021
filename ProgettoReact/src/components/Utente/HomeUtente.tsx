import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { FilterMenu } from "../../model/FilterMenu";
import { Menu } from "../../model/Menu";
import { RoutesUtente } from "../../routes/Cliente";
import { AjaxUtils } from "../../utils/AjaxUtils";
import { JSONUtils } from "../../utils/JSONUtils";
import { StorageUtils } from "../../utils/StorageUtils";
import { Users } from "../../utils/Users";
import { BottomNavBarComponent, BottomNavBarProps } from "../shared/BottomNavBarComponent";
import { TopBar } from "../shared/TopBar";
import { FilterMenuComponent } from "./FilterMenuComponent";
import { MenuComponent } from "./MenuComponent";

interface HomeUtenteProps{
    route: RoutesUtente
    onClickLogout: OnClickLogout
}

interface OnClickLogout{
    ():void
}

export const HomeUtente: React.FunctionComponent<HomeUtenteProps> = (props) => {

    const history = useHistory();
    const [page, setPage] = useState<string>("");
    const [menus, setMenus] = useState<Menu[]>([]);

    const getMenus = (filterMenu: FilterMenu)=>{
        AjaxUtils.getMenus(Users.CLIENTE, filterMenu).then((result)=>{
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if(ajaxResult !== "error"){
                //console.log(ajaxResult);
                setMenus(ajaxResult);
            }
        }).catch(()=>{

        })
    }

    useEffect(() => {
        switch (props.route) {
            case RoutesUtente.HOME:
                setPage("Home");
                break;
            case RoutesUtente.LOGOUT:
                setPage("Logout");
                break;
            default: break;
        }
    }, [props.route])

    const bottombarprops: BottomNavBarProps = {
        actions: [
            {
                label: "Home",
                selected: props.route === RoutesUtente.HOME,
                onClick: () => {
                    history.replace(RoutesUtente.HOME);
                }
            }, {
                label: "Logout",
                selected: props.route === RoutesUtente.LOGOUT,
                onClick: () => {
                    props.onClickLogout();
                }
            }
        ]
    }


    return <><TopBar text={page} />
        {props.route === RoutesUtente.HOME && <div className="container py-5 my-5">
            <FilterMenuComponent onClickSearch={getMenus} />
            {menus.map((value, index)=>{
                return <MenuComponent menu={value} />
            })}
        </div>}
        
        <BottomNavBarComponent actions={bottombarprops.actions} /></>
}