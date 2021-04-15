import { FabActionButton } from "../../shared/FabActionButton"
import Plus from "../../../img/icon_plus.svg";
import { useHistory } from "react-router";
import { RoutesRistoratore } from "../../../routes/Ristoratore";
import { AddMenuComponent } from "./AddMenuComponent";
import { useEffect, useState } from "react";
import { Menu } from "../../../model/Menu";
import { MenuComponent } from "./MenuComponent";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";

interface PageMenuProps{
    route: RoutesRistoratore
}

export const PageMenu: React.FunctionComponent<PageMenuProps> = (props)=>{

    const history = useHistory();
    const [menus, setMenus] = useState<Menu[]>([]);

    const getMenus = ()=>{
        AjaxUtils.getMenusRestaurateur().then((result)=>{
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if(ajaxResult !== "error"){
                //console.log(ajaxResult);
                setMenus(ajaxResult);
            }
        }).catch(()=>{

        })
    }

    useEffect(()=>{
        getMenus();
    },[])

    if(props.route === RoutesRistoratore.MENUS){
        return <>
        {menus.map((value, index)=>{
            return <MenuComponent menu={value} key={index} />
        })}
        <FabActionButton icon={Plus} onClick={()=>{history.replace(RoutesRistoratore.ADD_MENU)}}/> 
        </>
    }
    else{
       return  <AddMenuComponent />
    }

    
}