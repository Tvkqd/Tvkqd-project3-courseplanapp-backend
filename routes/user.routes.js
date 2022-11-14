module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", user.create);
    // Retrieve all 
    router.get("/", user.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", user.findOne);
    // Update with id
    router.put("/:id", user.update);
    // Delete with id
    router.delete("/:id", user.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/user', router);
  };