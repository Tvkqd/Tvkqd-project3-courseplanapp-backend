module.exports = app => {
    const faculty = require("../controllers/faculty.controller.js");
    var router = require("express").Router();
    const { authenticate } = require("../authorization/authorization.js");
    // Create 
    router.post("/", [authenticate], faculty.create);
    // Retrieve all 
    router.get("/", [authenticate], faculty.findAll);
    // Retrieve a single faculty with id
    router.get("/:id", [authenticate], faculty.findOne);
    // Update with id
    router.put("/:id", [authenticate], faculty.update);
    // Delete with id
    router.delete("/:id", [authenticate], faculty.delete);
    //Changed to schedule to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/faculty', router);
  };