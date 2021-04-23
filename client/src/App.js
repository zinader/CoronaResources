import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import AddComponent from "./components/AddComponent";
import Footer from "./components/footer";
import imgB from './components/undraw_medical_care_movn.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6'> 
              <div className="title">
                <h1>
                  Covi<span className="high">Resources</span>
                </h1>
                <p className='brief'>
                  A place where you can find all the help you need to fight this pandemic. We’re in this together. 
                  Share with your friends and family, your small step might save a life.
                </p>
                <p className='muted'>
                  Have any feedbacks/suggestions? <a href='#footer'>Contact Us</a>
                </p>
              </div>
            </div>
            <div className='text-center col-md-6'>
              <img className='banner-img' src={imgB}></img>
            </div>
          </div>
        </div>
        <Route exact path="/" component={MainComponent} />
        <Route exact path="/addresource" component={AddComponent} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
