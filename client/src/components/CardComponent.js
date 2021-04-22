import axios from "axios";
<<<<<<< HEAD
import React from "react";
=======
import React, {useState, useEffect} from "react";
>>>>>>> c4d27c2bc79e8a90bc7f73df98e3e20d6f357a40
import { Button, Card } from "react-bootstrap";

const CardComponent = (props) => {

  const [resource, setResource] = useState(null)
  const upvoteHandler = async (id) => {
    await axios
      .post("http://127.0.0.1:5002/resource/upvote", { id })
      .then((res) => console.log("done"));
    
    setResource((prev)=>({
      ...prev,
      popularity: resource.popularity++
    }))
  };

<<<<<<< HEAD
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
=======
  useEffect(async() => {
    setResource(props.resource)
    console.log(resource)
  },[])

  if(resource){
    return(
      <div>
        <Card style={{ margin: "0 auto", width: "18rem" }}>
          <Card.Body>
            <Card.Title>{resource.name}</Card.Title>
            <Card.Text>{resource?.phone}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              Upvotes: {resource.popularity} , {resource?.location}
            </Card.Subtitle>
            <Card.Text>{resource?.resourceName}</Card.Text>
            <Button
              style={{ margin: "0 1rem" }}
              onClick={() => upvoteHandler(resource._id)}
            >
              Upvote
            </Button>
            <Button>Mark Obsolete</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
  else{
    return(
      <div>

      </div>
    )
  }
>>>>>>> c4d27c2bc79e8a90bc7f73df98e3e20d6f357a40
};

export default CardComponent;
