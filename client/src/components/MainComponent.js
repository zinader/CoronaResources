import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import CardComponent from "./CardComponent";

const MainComponent = () => {
  const [state, setState] = useState("");
  const [resources, setResources] = useState([]);

  const handleSelect = () => {
    const fetchData = async () => {
      await axios
        .get("http://127.0.0.1:5002/resource")
        .then((res) => setResources(res.data));
    };

    fetchData();
    console.log(resources);
  };

  const renderCards = () => {
    return(
      resources.map((resource)=>{
        return(
          <CardComponent resource={resource} />
        )
      })
    )
  }

  return (
    <>
      <div>
        <DropdownButton
          style={{ marginBottom: "2rem" }}
          id="dropdown-basic-button"
          title={state ? state : "Select State"}
          onSelect={handleSelect}
        >
          <Dropdown.Item onClick={() => setState("Delhi")}>Delhi</Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Mumbai")}>
            Mumbai
          </Dropdown.Item>
        </DropdownButton>
      </div>
<<<<<<< HEAD:client/src/components/MainComponent.js

      <CardComponent resources={resources} />
=======
      {resources?renderCards():null}
>>>>>>> c4d27c2bc79e8a90bc7f73df98e3e20d6f357a40:client/src/components/Main.js
    </>
  );
};

export default MainComponent;
