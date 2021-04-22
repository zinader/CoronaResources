import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import CardComponent from "./CardComponent";

const Main = () => {
  const [state, setState] = useState(null);
  const [resources, setResources] = useState(null);

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
      {resources?renderCards():null}
    </>
  );
};

export default Main;
