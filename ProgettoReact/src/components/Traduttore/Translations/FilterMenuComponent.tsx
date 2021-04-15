import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Citta } from "../../../model/Citta";
import { FilterMenu } from "../../../model/FilterMenu";
import { Provincia } from "../../../model/Provincia";
import { Restaurant } from "../../../model/Restaurant";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { strings } from "../../../utils/Strings";
import { Users } from "../../../utils/Users";

interface FilterMenuProps {
  onClickSearch: OnClickSearch
}

interface OnClickSearch {
  (filterMenu: FilterMenu): void
}

export const FilterMenuComponent: React.FunctionComponent<FilterMenuProps> = (props) => {

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cities, setCities] = useState<Citta[]>([]);
  const [provinces, setProvinces] = useState<Provincia[]>([]);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedRestaturant, setSelectedRestaurant] = useState<string>("");

  const getProvinces = () => {
    AjaxUtils.getProvinces(Users.TRADUTTORE).then((result) => {
      const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
      if (ajaxResult !== "error") {
        setProvinces(ajaxResult);
      }

    })
  }

  const getCitiesByProvinceId = (id_provincia: number) => {
    AjaxUtils.getCitiesByProvinceId(Users.TRADUTTORE, id_provincia).then((result) => {
      const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
      if (ajaxResult !== "error") {
        setSelectedCity("");
        setCities(ajaxResult);
      }

    })
  }

  const getRestaurantsByCityId = (id_citta: number) => {
    AjaxUtils.getRestaurantsByCityId(Users.TRADUTTORE, id_citta).then((result) => {
      const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
      if (ajaxResult !== "error") {
        setSelectedRestaurant("");
        setRestaurants(ajaxResult);
      }
    })
  }

  useEffect(() => {
    getProvinces();
  }, [])

  return <Form>

    <Form.Group controlId="formGridState">
      <Form.Label>{strings.province}</Form.Label>
      <Form.Control as="select" value={selectedProvince} onChange={(e) => {
        setSelectedProvince(e.target.value)
        if (e.target.value !== "") {
          getCitiesByProvinceId(parseInt(e.target.value))
        } else {
          setSelectedCity("");
          setCities([])
        }
      }}>
        <option value="">{strings.select_empty_field}</option>
        {provinces.map((value, index) => {
          return <option key={index} value={value.id}>{value.nome} ({value.sigla})</option>
        })}
      </Form.Control>
    </Form.Group>

    <Form.Group controlId="formGridCity">
      <Form.Label>{strings.city}</Form.Label>
      <Form.Control as="select" value={selectedCity} onChange={(e) => {
        setSelectedCity(e.target.value);
        if (e.target.value !== "") {
          getRestaurantsByCityId(parseInt(e.target.value));
        } else {
          setSelectedRestaurant("");
          setRestaurants([]);
        }
      }}>
        <option value="">{strings.select_empty_field}</option>
        {cities.map((value, index) => {
          return <option key={index} value={value.id}>{value.nome}</option>
        })}
      </Form.Control>
    </Form.Group>

    <Form.Group controlId="formGridRistorante">
      <Form.Label>{strings.restaurant}</Form.Label>
      <Form.Control as="select" value={selectedRestaturant} onChange={(e)=>{
        setSelectedRestaurant(e.target.value);
      }}>
        <option value="">{strings.select_empty_field}</option>
        {restaurants.map((value, index)=>{
          return <option key={index} value={value.id}>{value.nome}, {value.indirizzo} {value.civico}</option>
        })}
      </Form.Control>
    </Form.Group>

    <Button variant="primary" type="button" onClick={() => {
      props.onClickSearch({
        city_id: selectedCity === "" ? null : parseInt(selectedCity),
        restaurant_id: selectedRestaturant === "" ? null : parseInt(selectedRestaturant),
        province_id: selectedProvince === "" ? null : parseInt(selectedProvince)
      })
    }}>
      {strings.search}
    </Button>
  </Form>

}