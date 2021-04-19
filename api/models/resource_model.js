const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//Resource information needed
const resourceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    typetags: { type: [String]},
    price: { type: Number, required: true },
},{
    timestamps: true,
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;