const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//menu information needed
const menuSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    typetags: { type: [String]},
    price: { type: Number, required: true },
},{
    timestamps: true,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;