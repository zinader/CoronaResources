import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddComponent = () => {
  const [resourceType, setResourceType] = useState(1);
  const [resourceName, setResourceName] = useState("Oxygen");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("Delhi");
  const [website, setWebsite] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendRequest = async () => {
      await axios
        .post("https://resourcecovid.herokuapp.com/resource/add", {
          resourceType,
          resourceName,
          name,
          description,
          phone,
          email,
          location,
          address,
          state,
          website,
          status: true,
        })
        .then((res) => alert(res.data));
    };
    sendRequest();

    setResourceType(1);
    setResourceName("");
    setName("");
    setDescription("");
    setPhone(0);
    setEmail("");
    setLocation("");
    setState("");
    setWebsite([]);
  };

  const setResource = (e) => {
    if (e.target.value == 1) {
      setResourceName("Oxygen");
      setResourceType(1);
    }
    if (e.target.value == 2) {
      setResourceName("Ambulance");
      setResourceType(2);
    }
    if (e.target.value == 3) {
      setResourceName("Home Testing");
      setResourceType(3);
    }
    if (e.target.value == 4) {
      setResourceName("Plasma");
      setResourceType(4);
    }
    if (e.target.value == 5) {
      setResourceName("Remdesivir");
      setResourceType(5);
    }
    if (e.target.value == 6) {
      setResourceName("Fabiflu");
      setResourceType(6);
    }
    if (e.target.value == 7) {
      setResourceName("Beds");
      setResourceType(7);
    }
    if (e.target.value == 8) {
      setResourceName("Medicine");
      setResourceType(8);
    }
    if (e.target.value == 9) {
      setResourceName("Doctors");
      setResourceType(9);
    }
    if (e.target.value == 10) {
      setResourceName("Mental Health");
      setResourceType(10);
    }
    if (e.target.value == 11) {
      setResourceName("Food Services");
      setResourceType(11);
    }
    if (e.target.value == 12) {
      setResourceName("Home Services");
      setResourceType(11);
    }
  };

  return (
    <div className="add-page">
      <h1 style={{ textAlign: "center" }}>Add Resource</h1>
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-12">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Resource Name</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="Enter Resource Name"
                  onChange={setResource}
                >
                  <option value={1}>Oxygen</option>
                  <option value={2}>Ambulance</option>
                  <option value={3}>Home Testing</option>
                  <option value={4}>Plasma</option>
                  {/* <option value={7}>Beds</option> */}
                  <option value={8}>Medicine</option>
                  <option value={9}>Doctors</option>
                  <option value={10}>Mental Health</option>
                  <option value={11}>Food Services</option>
                  <option value={12}>Home Services</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter Contact"
                  onChange={(e) => setPhone([`${e.target.value}`])}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="Enter State Name"
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value={"Delhi"}>Delhi</option>
                  <option value={"Mumbai"}>Mumbai</option>
                  <option value={"Bengaluru"}>Bengaluru</option>
                  <option value={"Pune"}>Pune</option>
                  <option value={"Chandigarh"}>Chandigarh</option>
                  <option value={"NCR"}>NCR</option>
                  <option value={"Chennai"}>Chennai</option>
                  <option value={"Uttrakhand"}>Uttrakhand</option>
                  {/* <option value={8}>Medicine</option>
                  <option value={9}>Doctors</option>
                  <option value={10}>Mental Health</option>
                  <option value={11}>Food Services</option> */}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Links</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Links"
                  onChange={(e) => setWebsite([`${e.target.value}`])}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button
                className="mb-5 text-center"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
