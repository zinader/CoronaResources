import axios from "axios";

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
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
            <h3>
              {resource.name}
              {/* {resource.links.length > 0
                ? resource.links.map((link) => (
                    <a className="link" href={`http://${link}`} target="_blank">
                      <i className="fa fa-external-link-alt"></i>
                    </a>
                  ))
                : null} */}
            </h3>

            <div className="area">
              {resource.state ? (
                <p className="location">{resource.state}</p>
              ) : null}
              {resource.location ? (
                <p className="location">{resource.location}</p>
              ) : null}
              <p className='location'>{resource.resourceName}</p>
            </div>

          </Card.Header>
          <div style={{ position: "absolute", right: "1rem", top: "10px" }}>
            <p className="trending">
              <BiTrendingUp color="green" /> {resource.popularity}
            </p>
          </div>
          <div style={{ position: "absolute", left: "1rem", top: "10px" }}>
            <p className="stash">
              <i onClick={() => setStash(true)} className="fa fa-2x fa-times"></i>
            </p>
            <Modal show={stash} onHide={() => setStash(false)}>
              <i className='fa fa-times fa-5x'></i>
              <p>Are you sure you want to mark this lead spam?</p>
              <div className='btns-area'>
                <Button className='stash-confirm' onClick={() => stashLead()}>Yes</Button>
                <Button color="red" className='stash-cancel' onClick={() => setStash(false)}>
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
          {resource.description ? (
            <p className="desc">{resource.description}</p>
          ) : null}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a className="tel" href={`tel:${resource.phone}`}>
              <i className="fa fa-phone-alt"></i>
            </a>
            <Button
              className="up-btn"
              onClick={() => upvoteHandler(resource._id)}
            >
              UPVOTE
            </Button>
            <a class='whatsapp' href={`https://wa.me/?text="
              Contact: ${resource.phone}
              Resource: ${resource.resourceName}
              State: ${resource.state}
              Description: ${resource.description}
              Location: ${resource.location}
              Link: ${resource.links}"`}>
              <i className='fa  fa-whatsapp'></i>
            </a>
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
