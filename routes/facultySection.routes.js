module.exports = app => {
    const facultySection = require("../controllers/facultySection.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
    // Create 
    router.post("/", [authenticate], facultySection.create);
    // Retrieve all 
    router.get("/", [authenticate], facultySection.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", [authenticate], facultySection.findOne);
    // Update with id
    router.put("/:id", [authenticate], facultySection.update);
    // Delete with id
    router.delete("/:id", [authenticate], facultySection.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/facultySection', router);
  };