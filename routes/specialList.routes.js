module.exports = app => {
    const specialList = require("../controllers/specialList.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", specialList.create);
    // Retrieve all 
    router.get("/", specialList.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", specialList.findOne);
    // Update with id
    router.put("/:id", specialList.update);
    // Delete with id
    router.delete("/:id", specialList.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/specialList', router);
  };