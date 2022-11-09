module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
    // Create 
    router.post("/", [authenticate], user.create);
    // Retrieve all 
    router.get("/", [authenticate], user.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", [authenticate], user.findOne);
    // Update with id
    router.put("/:id", [authenticate], user.update);
    // Delete with id
    router.delete("/:id", [authenticate], user.delete);
    //Changed to scheduleSection to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/user', router);
  };