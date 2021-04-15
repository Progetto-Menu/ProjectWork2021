import { Card } from "react-bootstrap";
import { Menu } from "../../../model/Menu";
import { strings } from "../../../utils/Strings";

interface MenuComponentProps {
    menu: Menu
}

export const MenuComponent: React.FunctionComponent<MenuComponentProps> = (props) => {
    return <Card className="my-3">
        <Card.Header>
            <Card.Title>{props.menu.restaurant.nome}, {props.menu.restaurant.indirizzo} {props.menu.restaurant.civico}, {props.menu.restaurant.citta} ({props.menu.restaurant.provincia})</Card.Title>
            <Card.Title>{props.menu.title}</Card.Title>
            <Card.Subtitle>{props.menu.title}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
            {props.menu.sections.map((value, index) => {
                return <Card className="my-3" key={index}>
                    <Card.Header>
                        <Card.Title>
                            {value.name}
                        </Card.Title>
                        <Card.Subtitle>
                            {value.subtitle}
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        {value.dishes.map((val, i) => {
                            return <Card className="my-3" key={i}>
                                <Card.Body>
                                    <h5>{val.name}</h5>
                                    <h5>{val.description}</h5>
                                    <h5>{val.price}</h5>
                                </Card.Body>

                            </Card>
                        })}
                    </Card.Body>
                </Card>
            })}
            <Card>
                <Card.Header className="bg-primary text-white">
                    {strings.languages}
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">{strings.your_languages_language_column}</th>
                                    <th className="text-center">{strings.your_languages_code_column}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.menu.languages.length === 0 && <tr><td colSpan={3} className="text-center align-middle">{strings.no_elements_prensent_in_the_table}</td></tr>}
                                {props.menu.languages.map((value, index) => {
                                    return <tr key={index}>
                                        <td className="text-center align-middle">{value.name}</td>
                                        <td className="text-center align-middle">{value.sign}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>

        </Card.Body>
    </Card>
}