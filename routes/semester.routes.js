module.exports = app => {
    const semester = require("../controllers/semester.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", semester.create);
    // Retrieve all 
    router.get("/", semester.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", semester.findOne);
    // Update with id
    router.put("/:id", semester.update);
    // Delete with id
    router.delete("/:id", semester.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/semester', router);
  };