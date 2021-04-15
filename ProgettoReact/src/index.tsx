import ReactDOM from "react-dom";
import "./styles/app.css";
import { App } from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MemoryRouter } from "react-router";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, document.getElementById('root'))
