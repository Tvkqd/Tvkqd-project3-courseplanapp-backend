module.exports = app => {
    const officeHour = require("../controllers/officeHour.controller.js");
    var router = require("express").Router();
    const { authenticate } = require("../authorization/authorization.js");
    // Create 
    router.post("/", [authenticate], officeHour.create);
    // Retrieve all 
    router.get("/", [authenticate], officeHour.findAll);
    // Retrieve a single officeHour with id
    router.get("/:id", [authenticate], officeHour.findOne);
    // Retrieve officeHour of a user with id
    router.get("/user/:id", [authenticate], officeHour.findUserOfficeHour);
    // Update with id
    router.put("/:id", [authenticate], officeHour.update);
    // Delete with id
    router.delete("/:id", [authenticate], officeHour.delete);
    //Changed to offceHour to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/officeHour', router);
  };