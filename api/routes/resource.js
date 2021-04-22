import express from "express";
const router = express.Router();
import Resource from "../models/resource_model.js";

//get all resources
router.route("/").get((req, res) => {
    Resource.find()
    .sort({ popularity: -1 })
    .then(result => res.json({
      success: true,
      data: result
    }))
    .catch(err => res.json({
      success: false,
      error: err
    }))

});


router.route("/:state/:resource").get((req, res) => {
  Resource.find({
    state: req.params.state,
    resourceType: Number(req.params.resource)
  })
    .sort({popularity: -1,updatedAt: -1})
    .then(result => res.json({
      success: true,
      data: result
    }))
    .catch((err) => res.status(400).json("Error: " + err));
});

//adding a new item to  the Resources
router.route("/add").post((req, res) => {
  
    const resourceType = req.body.resourceType;
    const resourceName = req.body.resourceName;
    const name = req.body.name;
    const description = req.body.description;
    const phone= req.body.phone;
    const email=req.body.email;
    const location=req.body.location;
    const state = req.body.state;
    const links = req.body.website;
    const status = req.body.status;
    
    const newResource = new Resource({
        
        resourceName,
        resourceType,
        name,
        description,
        phone,
        email,
        location,
        state,
        links,
        status
    });

  newResource
    .save()
    .then(() => res.json("Added to the Resources!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete an item from the Resources
router.route("/:id").delete((req, res) => {
  Resource.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//increment popularity 
router.route('/upvote').post((req,res) =>{
    var id = req.body.id;
    Resource.findOneAndUpdate({_id :id}, {$inc : {popularity : 1}},{new:true})
             .then((response) => res.json({
               success: true,
               data: response
             }))
             .catch(err => res.json({
               success: false,
               error: err
             }));
})

router.route('/stash/:id').post((req, res)=>{
    const id = req.params.id
    console.log(id)
    Resource.findOneAndUpdate(
      {_id: id},
      { status: false},
      (err, response) => {
        response?res.json({
          success: true,
          data: response
        }):res.json({
          success: false,
          error: err
        })
      }
    )
})

export default router;

