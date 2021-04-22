import axios from "axios";
import React from "react";
import { Button, Card } from "react-bootstrap";

const CardComponent = ({ resources }) => {
  const upvoteHandler = async (id) => {
    await axios
      .post("http://127.0.0.1:5002/resource/upvote", { id })
      .then((res) => alert(res.data));
  };

  return (
    <div>
      {resources
        ?.sort(
          (
            { popularity: previousPopularity },
            { popularity: currentPopularity }
          ) => currentPopularity - previousPopularity
        )
        .map((resource) => (
          <>
            <Card style={{ margin: "0 auto", width: "18rem" }}>
              <Card.Body>
                <Card.Title>{resource.resourceName}</Card.Title>
                <Card.Text>{resource?.phone}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  Upvotes: {resource.popularity} , {resource?.location}
                </Card.Subtitle>
                <Card.Text>{resource?.name}</Card.Text>
                <Button
                  style={{ margin: "0 1rem" }}
                  onClick={() => upvoteHandler(resource._id)}
                >
                  Upvote
                </Button>
                <Button>Mark Obsolete</Button>
              </Card.Body>
            </Card>
            <br />
          </>
        ))}
    </div>
  );
};

export default CardComponent;
