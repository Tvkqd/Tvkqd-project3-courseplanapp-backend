module.exports = app => {
    const section = require("../controllers/section.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", section.create);
    // Retrieve all 
    router.get("/", section.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", section.findOne);
    // Update with id
    router.put("/:id", section.update);
    // Delete with id
    router.delete("/:id", section.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/section', router);
  };