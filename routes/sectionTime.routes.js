module.exports = app => {
    const sectionTime = require("../controllers/sectionTime.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", sectionTime.create);
    // Retrieve all 
    router.get("/", sectionTime.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", sectionTime.findOne);
    // Update with id
    router.put("/:id", sectionTime.update);
    // Delete with id
    router.delete("/:id", sectionTime.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/sectionTime', router);
  };