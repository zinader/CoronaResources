import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Resource information needed
const resourceSchema = new Schema(
  {
    resourceType: { type: Number, required: true },
    resourceName: { type: String, required: true },
    name: { type: String, required: false },
    description: { type: String, required: false },
    popularity: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
    phone: { type: Array, trim: true, required: false },
    email: { type: String, trim: true, required: false, lowercase: true },
    location: { type: String, required: false },
    state: { type: String, required: true },
    links: { type: Array, required: false },
    status: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
