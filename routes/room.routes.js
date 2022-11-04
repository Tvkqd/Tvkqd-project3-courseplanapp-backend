module.exports = app => {
    const room = require("../controllers/room.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", room.create);
    // Retrieve all 
    router.get("/", room.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", room.findOne);
    // Update with id
    router.put("/:id", room.update);
    // Delete with id
    router.delete("/:id", room.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/room', router);
  };