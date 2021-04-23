import axios from "axios";

import React, { useState, useEffect } from "react";

import { Button, Card, Modal } from "react-bootstrap";
import { BiTrendingUp } from "react-icons/bi";
import { InlineShareButtons } from "sharethis-reactjs";

const CardComponent = (props) => {
  const [resource, setResource] = useState(null);
  const [stash, setStash] = useState(false);
  const upvoteHandler = async (id) => {
    await axios.post("http://127.0.0.1:5000/resource/upvote", { id });

    setResource((prev) => ({
      ...prev,
      popularity: resource.popularity++,
    }));
  };

  const handleTime = (t) => {
    var d1 = new Date(t);
    var d2 = new Date();
    var diff = (d2 - d1) / (1000 * 60);
    return Math.round(diff);
  };

  const stashLead = () => {
    const handleSuccess = () => {
      setResource((prev) => ({
        ...prev,
        status: false,
      }));
      alert(
        "Resource Stashed, we'll verify this before deleting from the database!"
      );
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({}),
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/resource/stash/${resource._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => (result.success ? handleSuccess() : alert("Error!")))
      .catch((error) => console.log("error", error));

    setStash(false);
  };

  useEffect(async () => {
    setResource(props.resource);
    console.log(resource);
  }, []);

  useEffect(() => {
    console.log(resource?.status);
  }, [stash]);

  if (resource) {
    return (
      <div className="col-md-4 col-12">
        <Card style={{ maxWidth: "30rem", margin: "auto" }}>
          <Card.Header>
            <h2>
              {resource?.resourceName?.split(" ")[0][0]}
              {resource?.resourceName?.split(" ")[1][0]}
            </h2>
            <h3>{resource.name}</h3>

            <div className="area">
              {resource.state ? (
                <p className="location">{resource.state}</p>
              ) : null}
              {resource.location ? (
                <p className="location">{resource.location}</p>
              ) : null}
            </div>
            <a classname="tel" href={`tel:${resource.phone}`}>
              <i className="fa fa-phone-alt"></i>
            </a>
            {resource.links.length > 0
              ? resource.links.map((link) => (
                  <a className="link" href={`http://${link}`} target="_blank">
                    <i className="fa fa-external-link-alt"></i>
                  </a>
                ))
              : null}
          </Card.Header>
          <div style={{ position: "absolute", right: "1rem", top: "10px" }}>
            <p className="trending">
              <BiTrendingUp color="green" /> {resource.popularity}
            </p>
          </div>
          <div style={{ position: "absolute", left: "1rem", top: "10px" }}>
            <p className="stash">
              <i onClick={() => setStash(true)} className="fa fa-times"></i>
            </p>
            <Modal show={stash} onHide={() => setStash(false)}>
              <p>Are you sure you want to mark this lead spam?</p>
              <Button onClick={() => stashLead()}>Yes</Button>
              <Button color="red" onClick={() => setStash(false)}>
                Cancel
              </Button>
            </Modal>
          </div>
          {resource.description ? (
            <p className="desc">{resource.description}</p>
          ) : null}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              className="up-btn"
              onClick={() => upvoteHandler(resource._id)}
            >
              UPVOTE
            </Button>
            <InlineShareButtons
              config={{
                alignment: "center", // alignment of buttons (left, center, right)
                color: "social", // set the color of buttons (social, white)
                enabled: true, // show/hide buttons (true, false)
                font_size: 16, // font size for the buttons
                labels: "cta", // button labels (cta, counts, null)
                language: "en", // which language to use (see LANGUAGES)
                networks: [
                  // which networks to include (see SHARING NETWORKS)
                  "whatsapp",
                ],
                padding: 12, // padding within buttons (INTEGER)
                radius: 4, // the corner radius on each button (INTEGER)
                show_total: false,
                size: 40, // the size of each button (INTEGER)

                // OPTIONAL PARAMETERS
              }}
            />
          </div>
          <Card.Footer>
            <small className="text-muted">{`updated ${handleTime(
              resource.updatedAt
            )} minutes ago`}</small>
          </Card.Footer>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CardComponent;
