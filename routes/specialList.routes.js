module.exports = app => {
    const specialList = require("../controllers/specialList.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
    // Create 
    router.post("/", [authenticate], specialList.create);
    // Retrieve all 
    router.get("/", [authenticate], specialList.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", [authenticate], specialList.findOne);
    // Update with id
    router.put("/:id", [authenticate], specialList.update);
    // Delete with id
    router.delete("/:id", [authenticate], specialList.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/specialList', router);
  };