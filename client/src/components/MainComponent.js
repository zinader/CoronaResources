import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import CardComponent from "./CardComponent";
import Loader from "./Loader";

const MainComponent = () => {
  const [state, setState] = useState("");
  const [loader, setLoader] = useState(true);
  const [resources, setResources] = useState([]);
  const [resourceType, setType] = useState(null);
  const [names, setNames] = useState([
    "",
    "Oxygen",
    "Ambulance",
    "Home Testing",
    "Plasma",
    "",
    "",
    "Beds",
    "Medicine",
    "Doctors",
    "Mental Health",
    "Food Services",
  ]);

  const handleSubmit = () => {
    const handleResource = (res) => {
      setResources(null);
      setResources(res.data.data);
      // console.log(res.data);
    };
    setLoader(true);
    setTimeout(async () => {
      await axios

        .post(`https://resourcecovid.herokuapp.com/resource/filter/`, {
          state: state,
          resourceType: resourceType,
        })
        .then((res) => handleResource(res));

      setLoader(false);
    }, 1000);

    // console.log(state, resourceType);
  };

  const renderCards = () => {
    if (resources.length > 0) {
      return resources.map((resource) => {
        return <CardComponent resource={resource} />;
      });
    } else {
      return <h1 className="col-12 text-center pt-5">Sorry, Not Found</h1>;
    }
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      axios
        .get("https://resourcecovid.herokuapp.com/resource")
        .then((res) => setResources(res.data.data));
    }, 1000);
    setLoader(false);
  }, []);

  return (
    <>
      <div className="search-area">
        <DropdownButton
          style={{ marginBottom: "2rem" }}
          id="dropdown-basic-button"
          title={state ? state : "Select State"}
          // onSelect={(item) => console.log(item)}
        >
          <Dropdown.Item onClick={() => setState("")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Delhi")}>Delhi</Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Mumbai")}>
            Mumbai
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Bengaluru")}>
            Bengaluru
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Chennai")}>
            Chennai
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setState("NCR")}>NCR</Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Pune")}>Pune</Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Chandigarh")}>
            Chandigarh
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setState("Uttrakhand")}>
            Uttrakhand
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          style={{ marginBottom: "2rem" }}
          id="dropdown-basic-button"
          title={resourceType ? names[resourceType] : "Select Resource"}
          // onSelect={(item) => console.log(item)}
        >
          <Dropdown.Item onClick={() => setType(null)}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(1)}>Oxygen</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(2)}>Ambulance</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(3)}>Home Testing</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(4)}>Plasma</Dropdown.Item>
          {/* <Dropdown.Item onClick={() => setType(7)}>Beds</Dropdown.Item> */}
          <Dropdown.Item onClick={() => setType(8)}>Medicine</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(9)}>Doctors</Dropdown.Item>
          <Dropdown.Item onClick={() => setType(10)}>
            Mental Health
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setType(11)}>
            Food Services
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setType(12)}>
            Home Services
          </Dropdown.Item>
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
      {loader ? (
        <div className="outer-container">
          <Loader />
        </div>
      ) : (
        <div className="outer-container">
          <div class="container-fluid">
            <div className="row card-list">
              {resources ? renderCards() : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainComponent;
