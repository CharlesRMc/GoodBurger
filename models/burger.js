const orm = require('./../config/orm');

var burger = {
	all: (callback) => {
		orm.all('burgers', (res) => {
			callback(res);
		});
	},
	findBy: (col, val, callback) => {
		orm.findBy('burgers', val, (res) => {
			callback(res);
		});
	},
	// The variables cols and vals are arrays.
	create: (cols, vals, callback) => {
		orm.create('burgers', cols, vals, (res) => {
			callback(res);
		});
	},
	update: (objColVals, condition, callback) => {
		orm.update('burgers', objColVals, condition, (res) => {
			callback(res);
		});
	}
};

module.exports = burger;