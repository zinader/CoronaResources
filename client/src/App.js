import "./App.css";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div className="App">
      <div className='title'>
        <h1>Covi<span className='high'>Resource</span></h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
      <MainComponent />
    </div>
  );
}

export default App;
