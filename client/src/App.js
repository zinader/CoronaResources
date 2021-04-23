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
            A place where you can find all the help you need to fight this pandemic. We’re in this together. 
            Share with your friends and family, your small step might save a life.
          </p>
        </div>
        <Route exact path="/" component={MainComponent} />
        <Route exact path="/addresource" component={AddComponent} />
      </div>
    </Router>
  );
}

export default App;
