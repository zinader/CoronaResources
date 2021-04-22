import axios from "axios";
import React, {useState, useEffect} from "react";
import { Button, Card } from "react-bootstrap";

const CardComponent = (props) => {

  const [resource, setResource] = useState(null)
  const upvoteHandler = async (id) => {
    await axios
      .post("http://127.0.0.1:5000/resource/upvote", { id })
      .then((res) => console.log("done"));
    
    setResource((prev)=>({
      ...prev,
      popularity: resource.popularity++
    }))
  };

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
};

export default CardComponent;
