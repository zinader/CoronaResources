import express from "express";
const router = express.Router();
import Resource from "../models/resource_model.js";

//get all resources
router.route("/").get((req, res) => {
  //res.send("Resource Page");
  Resource.find()
    .then((resource) => res.json(resource))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get only 1 resource item
router.route("/:id").get((req, res) => {
  Resource.findById(req.params.id)
    .then((resource) => res.json(resource))
    .catch((err) => res.status(400).json("Error: " + err));
});

//adding a new item to  the Resources
router.route("/add").post((req, res) => {
  const { name, description, typetags, price } = req.body;

  const newResource = new Resource({
    name,
    description,
    typetags,
    price,
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

export default router;
