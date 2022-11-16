module.exports = app => {
    const room = require("../controllers/room.controller.js");
    var router = require("express").Router();
    const { authenticate } = require("../authorization/authorization.js");
    // Create 
    router.post("/", [authenticate], room.create);
    // Retrieve all 
    router.get("/", [authenticate], room.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", [authenticate], room.findOne);
    // Update with id
    router.put("/:id", [authenticate], room.update);
    // Delete with id
    router.delete("/:id", [authenticate], room.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/room', router);
  };