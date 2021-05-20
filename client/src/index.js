import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import renderRoutes from "./router";

ReactDOM.render(renderRoutes(App), document.getElementById("root"));
