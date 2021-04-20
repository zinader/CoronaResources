const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//Resource information needed
const resourceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    typetags: { type: [String]},
    price: { type: Number, required: true },
    popularity:{type:Number,required:true},
    phone: {type: String , trim: true,required:true},
    email:{type: String,
        trim: true,
        required:'Email Address is required',
        lowercase:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']},
    address:{type:String,required:true},
    state:{type:String,required:true}
},{
    timestamps: true,
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;