const express = require('express');

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger');

//Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
	burger.all((data) => {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/', (req, res) => {
	burger.create([
		'burger_name'
	], [
			req.body.name
		], () => {
			res.redirect('/');
		});
});

router.put('/:id', (req, res) => {
	// var condition = 'id = ' + req.params.id;
	var condition = `id = ${req.params.id}`;

	console.log('condition', condition);

	burger.update({
		devoured: req.body.devour
	}, condition, () => {
		res.redirect('/');
	});
});

// Export routes for server.js to use.
module.exports = router;
