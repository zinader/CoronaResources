import axios from "axios";

import React, { useState, useEffect } from "react";

import { Button, Card } from "react-bootstrap";
import { BiTrendingUp } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";

const CardComponent = (props) => {
  const [resource, setResource] = useState(null);
  const upvoteHandler = async (id) => {
    await axios

      .post("http://127.0.0.1:5000/resource/upvote", { id })

    setResource((prev) => ({
      ...prev,
      popularity: resource.popularity++,
    }));
  };

  const handleTime = (t) => {
    var d1 = new Date(t)
    var d2 = new Date()
    var diff = (d2-d1)/(1000*60)
    return Math.round(diff)
  }


  useEffect(async () => {
    setResource(props.resource);
    console.log(resource);
  }, []);


  if (resource) {
    return (
      <div className='col-md-4 col-12'>
        <Card style={{ maxWidth: "30rem", margin: "auto" }}>
          <Card.Header>
            <h2>
              {resource?.resourceName?.split(" ")[0][0]}
              {resource?.resourceName?.split(" ")[1][0]}
            </h2>
            <h3>
              {resource.name}
            </h3>
            <a classname='tel' href={`tel:${resource.phone}`}>
              <FiPhoneCall />
            </a>
            {resource.links.length > 0
              ? resource.links.map((link) => (
                  <a className='link' href={`http://${link}`} target="_blank">
                    <AiOutlineLink />
                  </a>
                ))
              : null}

            <p className='location'>{resource.location}</p>
          </Card.Header>
          <div style={{ position: "absolute", right: "1rem", top: "10px" }}>
            <p className='trending'>
              <BiTrendingUp color='green' /> {resource.popularity}
            </p>
          </div>
          <Card.Body>
            <Card.Text>{resource.description}</Card.Text>
          </Card.Body>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button className="up-btn" onClick={()=>upvoteHandler(resource._id)}>UPVOTE</Button>
            <Button className='stash-btn' style={{ backgroundColor: "red" }}>INVALID</Button>
          </div>
          <Card.Footer>
            <small className="text-muted">{`updated ${handleTime(resource.updatedAt)} minutes ago`}</small>
          </Card.Footer>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CardComponent;
