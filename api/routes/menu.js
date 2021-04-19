const router = require("express").Router();
let Menu = require('../models/menu_model');

//get all menu items
router.route('/').get((req, res) => {
    Menu.find()
        .then(menu => res.json(menu))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get only 1 menu item
router.route('/:id').get((req, res) => {
    Menu.findById(req.params.id)
        .then(menu => res.json(menu))
        .catch(err => res.status(400).json('Error: ' + err));
});

//adding a new item to  the menu
router.route('/add').post((req, res) => {

    const { name, description, typetags, price } = req.body;
    
    const newMenu = new Menu({
        name,
        description,
        typetags,
        price
    });

    newMenu.save()
        .then(() => res.json('Added to the Menu!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete an item from the menu
router.route('/:id').delete((req, res) => {
    Menu.findByIdAndDelete(req.params.id)
        .then(() => res.json("Item deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;