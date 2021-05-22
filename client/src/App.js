import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from "react-router-dom";
import MainComponent from "./components/MainComponent";
import AddComponent from "./components/AddComponent";
import imgB from "./components/undraw_medical_care_movn.svg";
import Footer from "./components/footer";
import Disclaimer from "./components/disclaimer";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="title">
                <h1>
                  <a href="/">
                    Corona<span className="high">Resources</span>
                  </a>
                </h1>
                <p className="brief">
                  {/* A place where you can find all the help you need to fight this
                  pandemic. We’re in this together. Share with your friends and
                  family, your small step might save a life. */}
                  Disclaimer: This information is only contingent to the
                  availability of the resources. We do not guarantee quality or
                  genuineness of the seller, we highly advise you to cross check
                  before placing the order/ booking an appointment. Please try
                  whatsapp if the person is not available on call<br></br>
                  <Link to="/disclaimer">Click here for disclaimer</Link>
                </p>
                <p className="add-links">
                  <a target="_blank" href="https://covidrelief.glideapp.io/">
                    Click here
                  </a>{" "}
                  for vacant bed tracker and govt. helplines based on govt.
                  data.
                </p>
                <p className="add-links">
                  <a target="_blank" href="https://forms.gle/ckXgB5YikNYjQeLx8">
                    Click here
                  </a>{" "}
                  for realtime Plasma Donors, in collaboration with{" "}
                  <a target="_blank" href="https://projectstepone.org/">
                    Project StepOne
                  </a>
                </p>
                <p className="muted">
                  Have any feedbacks/suggestions?{" "}
                  <a href="#footer">Contact Us</a>
                </p>
              </div>
            </div>
            <div className="text-center col-md-6">
              <img className="banner-img" src={imgB}></img>
            </div>
          </div>
        </div>
        <Route exact path="/" component={MainComponent} />
        <Route exact path="/addresource" component={AddComponent} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
