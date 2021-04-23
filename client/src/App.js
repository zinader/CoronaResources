import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import AddComponent from "./components/AddComponent";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="title">
          <h1>
            Covi<span className="high">Resource</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <Route exact path="/" component={MainComponent} />
        <Route exact path="/addresource" component={AddComponent} />
      </div>
    </Router>
  );
}

export default App;
