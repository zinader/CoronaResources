const router = require("express").Router();
let Resource = require('../models/resource_model');

//get all resources 
router.route('/').get((req, res) => {
    Resource.find()
        .then(resource => res.json(resource))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get only 1 resource item
router.route('/:id').get((req, res) => {
    Resource.findById(req.params.id)
        .then(resource => res.json(resource))
        .catch(err => res.status(400).json('Error: ' + err));
});

//adding a new item to  the Resources
router.route('/add').post((req, res) => {

    const { name, description, typetags, price ,phone,email,address,state} = req.body;
    
    const newResource = new Resource({
        name,
        description,
        typetags,
        price,
        phone,
        email,
        address,
        state,
    });

    newResource.save()
        .then(() => res.json('Added to the Resources!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete an item from the Resources
router.route('/:id').delete((req, res) => {
    Resource.findByIdAndDelete(req.params.id)
        .then(() => res.json("Item deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
})

//increment popularity 
router.route('/').post((req,res) =>{
    var id = req.body.id;
    Resource.findOneAndUpdate({_id :id}, {$inc : {'Resource.popularity' : 1}},{new:true})
             .then(() => res.json("Upvoted"))
             .catch(err => res.status(400).json('Error; '+ err));
})
module.exports = router;