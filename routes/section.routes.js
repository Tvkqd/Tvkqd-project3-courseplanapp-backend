module.exports = app => {
    const section = require("../controllers/section.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
    // Create 
    router.post("/", [authenticate], section.create);
    // Retrieve all 
    router.get("/", [authenticate], section.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", [authenticate], section.findOne);
    // Update with id
    router.put("/:id", [authenticate], section.update);
    // Delete with id
    router.delete("/:id", [authenticate], section.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/section', router);
  };