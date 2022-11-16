module.exports = app => {
    const sectionTime = require("../controllers/sectionTime.controller.js");
    var router = require("express").Router();
    const { authenticate } = require("../authorization/authorization.js");
    // Create 
    router.post("/", [authenticate], sectionTime.create);
    // Retrieve all 
    router.get("/", [authenticate], sectionTime.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", [authenticate], sectionTime.findOne);
    // Retrieve sectionTime of a room with id
    router.get("/room/:id", [authenticate], sectionTime.findRoomSectiontime);
    // Update with id
    router.put("/:id", [authenticate], sectionTime.update);
    // Delete with id
    router.delete("/:id", [authenticate], sectionTime.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/sectionTime', router);
  };