const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const PORT = process.env.port || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine(".hbs", exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set("view engine", ".hbs");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
});