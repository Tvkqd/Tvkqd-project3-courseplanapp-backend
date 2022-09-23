const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
//  origin: "http://localhost/course-t1"
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
app.options('*',cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Team 1! Test Passed" });
});

//call sync() method
const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

db.sequelize.sync().then(() => {
  console.log("Re-sync db.");
});
db.sequelize.sync();

//Connecting with database
require("./routes/course.routes")(app)
// set port, listen for requests
const PORT = process.env.PORT || 3001;
//const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});