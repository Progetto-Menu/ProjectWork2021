import React, { Component, useState } from 'react';
import { useHistory } from 'react-router';
import { CustomMenuDaTradurre } from '../../../model/CustomMenuDaTradurre';
import { FilterMenu } from '../../../model/FilterMenu';
import { CreateMenuCallBack, Menu } from '../../../model/Menu';
import { RoutesTraduttore } from '../../../routes/Traduttore';
import { AjaxUtils } from '../../../utils/AjaxUtils';
import { JSONUtils } from '../../../utils/JSONUtils';
import { BottomNavBarComponent, BottomNavBarProps } from '../../shared/BottomNavBarComponent';
import { TopBar } from '../../shared/TopBar';
import { FilterMenuComponent } from './FilterMenuComponent';
import { MenuToTranslateComponent } from './menuToTranslateComponent';


export const PageTranslations: React.FunctionComponent = () => {

    const [menuDaTradurre, setMenuDaTradurre] = useState<CustomMenuDaTradurre[]>([]);
    const history = useHistory();


    const getMenus = (filtermenu: FilterMenu) =>{
        AjaxUtils.getMenus(filtermenu).then((result)=>{
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if(ajaxResult !== "error"){
                setMenuDaTradurre(ajaxResult)
            }
        })
    }

    const setStringsToTranslate = (menu: CustomMenuDaTradurre) => {
        AjaxUtils.setStringsToTranslate(menu).then((result)=>{
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
            if(ajaxResult === "OK"){
                history.replace(RoutesTraduttore.HOME);
            }
        }).catch(()=>{

        })
    }

    return <>
            <FilterMenuComponent onClickSearch={getMenus}/>
            {menuDaTradurre.map((value, index)=>{
                return <MenuToTranslateComponent menu={value} onClick={setStringsToTranslate} />
            })}
    </> 

}
