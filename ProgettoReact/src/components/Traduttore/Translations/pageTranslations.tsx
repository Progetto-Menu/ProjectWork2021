import React, { Component, useState } from 'react';
import { useHistory } from 'react-router';
import { CreateMenuCallBack, Menu } from '../../../model/Menu';
import { RoutesTraduttore } from '../../../routes/Traduttore';
import { BottomNavBarComponent, BottomNavBarProps } from '../../shared/BottomNavBarComponent';
import { TopBar } from '../../shared/TopBar';
import { CreateMenuButtonComponent } from './createMenuButtonComponent';
import { FilterMenuComponent } from './FilterMenuComponent';
import { MenuToTranslateComponent } from './menuToTranslateComponent';
import { SearchBar } from './searchbar';


export const PageTranslations: React.FunctionComponent = () => {

    return <>
            <FilterMenuComponent onChange={()=>{}}/>
    </> 

}
