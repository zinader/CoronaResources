import mongoose from "mongoose";

const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//Resource information needed
const resourceSchema = new Schema(
  {

  	resourceType: { type: Number, required: true },
  	resourceName: { type: String, required: true },
    name: { type: String, required: false },
    description: { type: String, required: false },
    popularity:{type:Number,default:0},
    address: {
      type: String,
      required: false
    },
    phone: {type: Array, trim: true,required:false},
    email:{type: String,
        trim: true,
        required:false,
        lowercase:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']},
    location:{type:String,required:false},
    state:{type:String,required:true},
    links:{type: Array,required:false},
    status:{type: Boolean,default:true,required:true},
  },
  {
    timestamps: true
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
