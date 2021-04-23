import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import CardComponent from "./CardComponent";

const MainComponent = () => {
  const [state, setState] = useState("");
  const [resources, setResources] = useState([]);
  const [resourceType, setType] = useState(null);

  const handleSubmit = () => {
    const fetchData = async () => {
      await axios

        .post(`http://127.0.0.1:5000/resource/filter/`, {
          state: state,
          resourceType: resourceType,
        })
        .then((res) => setResources(res.data.data));
      console.log(resources);
    };

    console.log(`http://127.0.0.1:5000/resource/${state}/${resourceType}`);
    console.log(state);
    fetchData();
    console.log(resources);
  };

  const renderCards = () => {
    return resources.map((resource) => {
      return <CardComponent resource={resource} />;
    });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/resource")
      .then((res) => setResources(res.data.data));
  }, []);

  return (
    <>
      <div className="search-area">
        <DropdownButton
          style={{ marginBottom: "2rem" }}
          id="dropdown-basic-button"
          title={state ? state : "Select State"}
          onSelect={(item) => console.log(item)}
        >
          <Dropdown.Item onClick={() => setState("")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Delhi")}>Delhi</Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Mumbai")}>
            Mumbai
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          style={{ marginBottom: "2rem" }}
          id="dropdown-basic-button"
          title={resourceType ? resourceType : "Select State"}
          onSelect={(item) => console.log(item)}
        >
          <Dropdown.Item onClick={() => setType(null)}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(1)}>Oxygen</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(2)}>Ambulance</Dropdown.Item>
        </DropdownButton>
        <Button className="btn-search" onClick={() => handleSubmit()}>
          Search
        </Button>
        <Link
          to="/addresource"
          className="btn btn-warning"
          style={{ marginLeft: "1rem" }}
        >
          Add Resource
        </Link>
      </div>

      <div class="container-fluid">
        <div className="row card-list">{resources ? renderCards() : null}</div>
      </div>
    </>
  );
};

export default MainComponent;
