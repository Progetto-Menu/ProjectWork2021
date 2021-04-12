import { useEffect, useState } from "react";
import Plus from "../../../img/icon_plus.svg";
import { Restaurant } from "../../../model/Restaurant";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { FabActionButton } from "../../shared/FabActionButton";
import { RestaurantComponent } from "./RestaurantComponent";

export const HomeRistoratore: React.FunctionComponent = ()=>{

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const getRestaurants = ()=>{
        AjaxUtils.getRestaurants().then((result)=>{
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error")
            if(ajaxResult !== "error"){
                setRestaurants(ajaxResult);
            }
        })
    }

    useEffect(()=>{
        getRestaurants();
    }, [])

    return <>
    {restaurants.map((value, index)=>{
        return <RestaurantComponent restaurant={value} key={index} />
    })}
   <FabActionButton icon={Plus}/> 
    </>
}