import express from "express";
const router = express.Router();
import Resource from "../models/resource_model.js";

// Get all resources
router.get("/", async (req, res) => {
  try {
    const result = await Resource.find({ status: true })
      .sort({ popularity: -1, updatedAt: -1 })
      .exec();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Filter resources
router.post("/filter", async (req, res) => {
  const { state, resourceType } = req.body;

  try {
    let filters = {};

    if (state.length > 0) filters.state = state;
    if (resourceType) filters.resourceType = resourceType;
    filters.status = true;

    const result = await Resource.find(filters)
      .sort({ popularity: -1, updatedAt: -1 })
      .exec();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Add a new resource
router.post("/add", async (req, res) => {
  const {
    resourceType,
    resourceName,
    name,
    description,
    phone,
    email,
    location,
    state,
    website,
    status,
  } = req.body;

  try {
    const newResource = new Resource({
      resourceType,
      resourceName,
      name,
      description,
      phone,
      email,
      location,
      state,
      links: website,
      status,
    });

    await newResource.save();

    res.json("Added to the Resources!");
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

// Delete a resource
router.delete("/:id", async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json("Item deleted!");
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

// Increment popularity
router.post("/upvote", async (req, res) => {
  const { id } = req.body;

  try {
    const response = await Resource.findByIdAndUpdate(
      id,
      { $inc: { popularity: 1 } },
      { new: true }
    );

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get stashed resources
router.get("/stashed", async (req, res) => {
  try {
    const resources = await Resource.find({ status: false }).exec();

    res.json({
      success: true,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Stash a resource
router.post("/stash/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Resource.findByIdAndUpdate(
      id,
      { $inc: { downvote: 1 } },
      { new: true }
    );

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
