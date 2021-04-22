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
      .post("http://127.0.0.1:5001/resource/upvote", { id })
      .then((res) => console.log("done"));

    setResource((prev) => ({
      ...prev,
      popularity: resource.popularity++,
    }));
  };

  useEffect(async () => {
    setResource(props.resource);
    console.log(resource);
  }, []);

  if (resource) {
    return (
      <div>
        <Card style={{ maxWidth: "30rem", margin: "auto" }}>
          <Card.Header>
            {resource?.resourceName?.split(" ")[0][0]}
            {resource?.resourceName?.split(" ")[1][0]}
          </Card.Header>
          <div style={{ position: "absolute", right: "1rem", top: "10px" }}>
            <BiTrendingUp /> {resource.popularity}
          </div>
          <Card.Body>
            <Card.Title>{resource.name}</Card.Title>
            <a href={`tel:${resource.phone}`}>
              <FiPhoneCall />
            </a>
            {resource.links.length > 0
              ? resource.links.map((link) => (
                  <a href={`http://${link}`} target="_blank">
                    <AiOutlineLink />
                  </a>
                ))
              : null}
            <div>{resource.location}</div>

            <Card.Text>{resource.description}</Card.Text>
          </Card.Body>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button>UPVOTE</Button>
            <Button style={{ backgroundColor: "red" }}>INVALID</Button>
          </div>
          <Card.Footer>
            <small className="text-muted">{resource?.updatedAt}</small>
          </Card.Footer>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CardComponent;
