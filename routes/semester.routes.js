module.exports = app => {
    const semester = require("../controllers/semester.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
    // Create 
    router.post("/", [authenticate], semester.create);
    // Retrieve all 
    router.get("/", [authenticate], semester.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", [authenticate], semester.findOne);
    // Update with id
    router.put("/:id", [authenticate], semester.update);
    // Delete with id
    router.delete("/:id", [authenticate], semester.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/semester', router);
  };