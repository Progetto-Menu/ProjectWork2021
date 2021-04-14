import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useHistory } from "react-router";
import { Language } from "../../../model/Language";
import { Menu } from "../../../model/Menu";
import { Restaurant } from "../../../model/Restaurant";
import { Section } from "../../../model/Section";
import { RoutesRistoratore } from "../../../routes/Ristoratore";
import { AjaxUtils } from "../../../utils/AjaxUtils";
import { JSONUtils } from "../../../utils/JSONUtils";
import { SectionComponent } from "./SectionComponent";

export const AddMenuComponent: React.FunctionComponent = () => {

    const [titolo, setTitolo] = useState<string>("");
    const [sottotitolo, setSottotitolo] = useState<string>("");
    const [sezioni, setSezioni] = useState<Section[]>([]);
    const [ristoranti, setRistoranti] = useState<Restaurant[]>([]);
    const [ristoranteSelezionato, setRistoranteSelezionato] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [languages, setLanguages] = useState<Language[]>([]);
    const [languagesForMenu, setLanguagesForMenu] = useState<Language[]>([]);

    const [nomeSezione, setNomeSezione] = useState<string>("");
    const history = useHistory();

    const getRestaurants = () => {
        AjaxUtils.getRestaurants().then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error")
            if (ajaxResult !== "error") {
                setRistoranti(ajaxResult);
            }
        })
    }

    const getLanguages = (id_menu: number)=>{
        AjaxUtils.getAllLanguagesInWhichMenuCanBeTranslated(id_menu).then((result) => {
            const ajaxResult = JSONUtils.getProperty(result.data, "result", "error")
            if (ajaxResult !== "error") {
                const array : Language[] = [];

                for(let i=0;i<ajaxResult.length; i++){
                    array.push({
                        id: ajaxResult[i]["id"],
                        name: ajaxResult[i]["nome"],
                        sign: ajaxResult[i]["cod_lingua"],
                    })
                }
                setLanguages(array);
            }
        })
    }

    useEffect(() => {
        getRestaurants();
        getLanguages(0);
    }, [])


    return <Card>
        <Card.Header>
            {titolo === "" ? "Menù" : titolo}
        </Card.Header>
        <Card.Body>
            <Form.Group className="col-12">
                <Form.Label>Titolo</Form.Label>
                <Form.Control type="text" placeholder="Titolo" value={titolo} onChange={(e) => {
                    setTitolo(e.target.value);
                }} />
            </Form.Group>
            <Form.Group className="col-12">
                <Form.Label>Sottotitolo</Form.Label>
                <Form.Control type="text" placeholder="Sottotitolo" value={sottotitolo} onChange={(e) => {
                    setSottotitolo(e.target.value);
                }} />
            </Form.Group>
            <Form.Group className="col-12">
                <Form.Label>Ristorante</Form.Label>
                <Form.Control type="text" as="select" placeholder="Sottotitolo" value={ristoranteSelezionato} onChange={(e) => {
                    setRistoranteSelezionato(e.target.value);
                }}>
                    <option value="">Scegli...</option>
                    {ristoranti.map((value, index) => {
                        return <option key={index} value={value.id}>{value.nome}, {value.indirizzo} {value.citta} ({value.provincia})</option>
                    })}
                </Form.Control>
            </Form.Group>
            {sezioni.map((value, index) => {
                return <SectionComponent key={index} section={value} onChange={(section) => {
                    setSezioni(sezioni.map((val, i) => {
                        return i === index ? section : val
                    }))
                }
                } />
            })}

            <Card className="mb-3">
                <Card.Header>
                    Aggiungi Sezione
                </Card.Header>
                <Card.Body>
                    <Form.Group className="col-12">
                        <Form.Label>Nome Sezione</Form.Label>
                        <Form.Control type="text" placeholder="Titolo" value={nomeSezione} onChange={(e) => {
                            setNomeSezione(e.target.value);
                        }} />
                    </Form.Group>

                    <div className="col-12 text-right">
                        <Button type="button" variant="success" onClick={
                            () => {
                                setSezioni(sezioni.concat({
                                    id: 0,
                                    dishes: [],
                                    subtitle: "",
                                    name: nomeSezione
                                }))

                                setNomeSezione("");
                            }
                        }>Aggiungi Sezione</Button>
                    </div>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Header>
                    Le tue Lingue
            </Card.Header>
                <Card.Body>
                    <Form.Group className="col-12">
                        <Form.Label>Lingue</Form.Label>
                        <Form.Control as="select" value={selectedLanguage} onChange={(e) => {
                            setSelectedLanguage(e.target.value);
                        }}>
                            {languages.map((value,index)=>{
                                if(index === 0 && selectedLanguage === "") setSelectedLanguage(value.id.toString()); 
                                return <option key={index} value={value.id}>{value.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <div className="col-12 text-right mb-3">
                        <Button variant="success" onClick={
                            () => {
                                setLanguagesForMenu(languagesForMenu.concat(languages.filter((x)=> x.id === parseInt(selectedLanguage))));
                                setLanguages(languages.filter((x)=> x.id !== parseInt(selectedLanguage)))
                                setSelectedLanguage("");
                            }
                        }>Aggiungi</Button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Lingua</th>
                                    <th className="text-center">Codice</th>
                                    <th className="text-center">Rimuovi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {languagesForMenu.length === 0 && <tr><td colSpan={3} className="text-center align-middle">Nessun Elemento Presente nella Tabella</td></tr>}
                                {languagesForMenu.map((value, index) => {
                                    return <tr key={index}>
                                        <td className="text-center align-middle">{value.name}</td>
                                        <td className="text-center align-middle">{value.sign}</td>
                                        <td className="text-center align-middle"><Button variant="danger" onClick={() => {
                                            setLanguages(languages.concat(value).sort((a, b) => a.id - b.id));
                                            setLanguagesForMenu(languagesForMenu.filter((x)=> x.id !== value.id));
                                            setSelectedLanguage("");
                                        }}>Rimuovi</Button></td>
                                    </tr>
                                })}

                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <div className="col-12 text-right">
                <Button type="button" className="btn-lg" variant="success" onClick={
                    () => {
                        if(Number.isInteger(ristoranteSelezionato) && ristoranti.find((x)=>x.id === parseInt(ristoranteSelezionato)) != null){
                            const menu: Menu = {
                                id: 0,
                                languages: languagesForMenu,
                                restaurant: ristoranti.find((x)=>x.id === parseInt(ristoranteSelezionato)) as Restaurant,
                                sections: sezioni,
                                title: titolo,
                                subtitle: sottotitolo
                            }
                            AjaxUtils.createMenu(menu).then((result)=>{
                                const ajaxResult = JSONUtils.getProperty(result.data, "result", "error");
                                if(ajaxResult === "OK"){
                                    history.push(RoutesRistoratore.MENUS)
                                }
                            })
                        }
                    }
                }>Salva Menu</Button>
            </div>
        </Card.Body>
    </Card >
}