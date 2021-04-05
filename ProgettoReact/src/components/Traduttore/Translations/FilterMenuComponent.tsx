import { Button, Col, Form } from "react-bootstrap";
import { FilterMenu } from "../../../model/FilterMenu";

interface FilterMenuProps{
    onChange: FilterMenuComponentCallback
}

interface FilterMenuComponentCallback{
    (filterMenu: FilterMenu): void
}

export const FilterMenuComponent : React.FunctionComponent<FilterMenuProps>= (props)=>{

    return <Form>
    <Form.Row>
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Nome ristorante</Form.Label>
        <Form.Control />
      </Form.Group>
    </Form.Row>
  
    <Form.Group controlId="formGridAddress1">
      <Form.Label>Indirizzo</Form.Label>
      <Form.Control />
    </Form.Group>
  
    <Form.Row>
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>Citta</Form.Label>
        <Form.Control />
      </Form.Group>
  
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Provincia</Form.Label>
        <Form.Control as="select" defaultValue="Choose...">
          <option>Scegli...</option>
          <option>...</option>
        </Form.Control>
      </Form.Group>
  
      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>CAP</Form.Label>
        <Form.Control />
      </Form.Group>
    </Form.Row>
  
    <Button variant="primary" type="bottom" onClick={()=>{
        
    }}>
      Submit
    </Button>
  </Form>

}