// Import MySQL connection.
const connection = require('../config/connection');

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
var printQuestionMarks = (num) => {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	};

	return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
var objToSql = (ob) => {
	var arr = [];

	// loop through the keys and push the key/value as a string int arr
	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
			if (typeof value === 'string' && value.indexOf(' ') >= 0) {
				value = "'" + value + "'";
			}
			// e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
			// e.g. {sleepy: true} => ["sleepy=true"]
			// arr.push(key + "=" + value);
			arr.push(`${key} = ${value}`);
		}
	}

	// translate array of strings to a single comma-separated string
	return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
	all: (tableInput, callback) => {
		// var queryString = "SELECT * FROM " + tableInput + ";";
		var queryString = `SELECT * FROM ${tableInput}`;
		connection.query(queryString, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	},
	findBy: (table, col, val, callback) => {
		var queryString = `SELECT * FROM ${table} WHERE ${col} = ${val}`;

		connection.query(queryString, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	},
	create: (table, cols, vals, callback) => {
		var queryString = `INSERT INTO ${table} (${cols.toString()})
								VALUE (${printQuestionMarks(vals.length)})`

		// var queryString = "INSERT INTO " + table;
		// queryString += " (";
		// queryString += cols.toString();
		// queryString += ") ";
		// queryString += "VALUES (";
		// queryString += printQuestionMarks(vals.length);
		// queryString += ") ";

		console.log(queryString);

		connection.query(queryString, vals, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	},
	// An example of objColVals would be {name: panther, sleepy: true}
	update: (table, objColVals, condition, callback) => {
		var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`
		// var queryString = "UPDATE " + table;

		// queryString += " SET ";
		// queryString += objToSql(objColVals);
		// queryString += " WHERE ";
		// queryString += condition;

		console.log(queryString);
		connection.query(queryString, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	}
};

// Export the orm object for the model (cat.js).
module.exports = orm;
