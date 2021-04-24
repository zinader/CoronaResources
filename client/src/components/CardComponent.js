import axios from "axios";
import { useDebouncedCallback } from 'use-debounce';
import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { BiTrendingUp } from "react-icons/bi";


const CardComponent = (props) => {
  const [resource, setResource] = useState(null);
  const [stash, setStash] = useState(false);
  const [upvote, setUpvote] = useState(false)
  function upvoteHandler(id){
    axios.post("https://resourcecovid.herokuapp.com/resource/upvote", { id });

    setResource((prev) => ({
      ...prev,
      popularity: resource.popularity++,
    }));
    console.log(id)
    
  };

  const handleDebounce = (id) => {
    setUpvote(true)
    debounced(id)
  }

  const debounced = useDebouncedCallback(
    // function
    (id) => {
      upvoteHandler(id)
    },
    // delay in ms
    5000
  );
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
      `https://resourcecovid.herokuapp.com/resource/stash/${resource._id}`,
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
            <h2 className='text-uppercase'>
              {resource.resourceName.replace(" ", "")[0]}
              {resource.resourceName.replace(" ", "")[1]}
            </h2>
            <h3>
              {resource.name}
            </h3>
            <div className="area">
              {resource.state ? (
                <p className="location">{resource.state}</p>
              ) : null}
              {resource.location ? (
                <p className="location">{resource.location}</p>
              ) : null}
              <p className="location">{resource.resourceName}</p>
            </div>
          </Card.Header>
          <div style={{ position: "absolute", right: "1rem", top: "10px" }}>
            <p className="trending">
              <BiTrendingUp color="green" /> {resource.popularity}
            </p>
          </div>
          <div style={{ position: "absolute", left: "1rem", top: "10px" }}>
            <Modal show={stash} onHide={() => setStash(false)}>
              <i className="fa fa-times fa-5x"></i>
              <p>Are you sure you want to mark this lead spam?</p>
              <div className="btns-area">
                <Button className="stash-confirm" onClick={() => stashLead()}>
                  Yes
                </Button>
                <Button
                  color="red"
                  className="stash-cancel"
                  onClick={() => setStash(false)}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
          {resource.description ? (
            <p className="desc">{resource.description}</p>
          ) : null}
          <Card.Footer>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {resource.phone?(
                resource.phone.map((item) => {
                  return(
                    <a className="tel" href={`tel:${resource.phone}`}>
                    <i className="fa fa-phone-alt"></i>
                  </a>
                  )
                })
              ):null}
              <Modal show={upvote} onHide={()=> setUpvote(false)}>
                <div class='upvote-modal'>
                  <i className='fa fa-5x fa-check'></i>
                  <p>
                    Thanks for you response!
                  </p>
                </div>
              </Modal>
              <Button
                className="up-btn"
                onClick={() => handleDebounce(resource._id)}
              >
                UPVOTE
              </Button>
              <a
                class="whatsapp"
                href={`https://wa.me/?text=Contact: *${resource.phone?resource.phone:'-'}*%0aResource: *${resource.resourceName}*%0aState: *${resource.state}*%0aDescription: *${resource.description?resource.description:'-'}*%0aLocation: *${resource.location?resource.location:'-'}*%0aLink: *${resource.links?resource.links:'-'}*%0a_This resource was shared using *CoviResources*_`}
              >
                <i className="fa  fa-whatsapp"></i>
              </a>
            </div>
            <small className="text-muted">{`updated ${handleTime(
              resource.updatedAt
            )} minutes ago`}</small>
            <div className='report-area'>
              <a className='report-btn' onClick={()=> setStash(true)}>
                Report
              </a>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CardComponent;
