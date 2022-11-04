const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
// origin: "http://localhost/schedule-t1"
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
require("./routes/upload.routes")(app)
require("./routes/course.routes.js")(app)
require("./routes/faculty.routes.js")(app)
require("./routes/facultySection.routes.js")(app)
require("./routes/officeHour.routes.js")(app)
require("./routes/room.routes.js")(app)
require("./routes/section.routes.js")(app)
require("./routes/sectionTime.routes.js")(app)
require("./routes/semester.routes.js")(app)
require("./routes/specialList.routes.js")(app)
require("./routes/user.routes.js")(app)

// set port, listen for requests, changed to appropriate port defined for the project
const PORT = process.env.PORT || 3011;
//const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});