import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Plus from "../../../img/icon_plus.svg";
import { Restaurant } from "../../../model/Restaurant";
import { RoutesRistoratore } from "../../../routes/Ristoratore";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { FabActionButton } from "../../shared/FabActionButton";
import { AddRestaurantComponent } from "./AddRestaurantComponent";
import { RestaurantComponent } from "./RestaurantComponent";

interface HomeRistoratoreProps{
    route: RoutesRistoratore
}

export const HomeRistoratore: React.FunctionComponent<HomeRistoratoreProps> = (props)=>{

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const history = useHistory();

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

    if(props.route === RoutesRistoratore.HOME){
        return <>
        {restaurants.map((value, index)=>{
            return <RestaurantComponent restaurant={value} key={index} onClickSave={(restaurant)=>{
                AjaxUtils.updateRestaurant(restaurant).then((result)=>{
                    const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
                    if(ajaxResult === "OK"){
                        getRestaurants();
                    }
                })
            }} onClickDelete={(restaurant)=>{
                AjaxUtils.deleteRestaurant(restaurant).then((result)=>{
                    const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
                    if(ajaxResult === "OK"){
                        getRestaurants();
                    }
                })
            }}/>
        })}
       <FabActionButton icon={Plus} onClick={()=>{history.replace(RoutesRistoratore.ADD_RESTAURANT)}}/> 
        </>
    }
    else{
        return <AddRestaurantComponent onClickSave={(restaurant)=>{
            AjaxUtils.createRestaurant(restaurant).then((result)=>{
                const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
                if(ajaxResult === "OK"){
                    history.replace(RoutesRistoratore.HOME)
                    getRestaurants();
                }
            })
        }} />
    }

    
}