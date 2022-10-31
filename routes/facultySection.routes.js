module.exports = app => {
    const facultySection = require("../controllers/facultySection.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", facultySection.create);
    // Retrieve all 
    router.get("/", facultySection.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", facultySection.findOne);
    // Update with id
    router.put("/:id", facultySection.update);
    // Delete with id
    router.delete("/:id", facultySection.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/facultySection', router);
  };